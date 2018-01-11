import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';

// This is a Higher Order Component that abstracts duplicated data fetching
// on the server and client.
export default function SSR(Page) {
  class SSR extends React.Component {
    static getInitialData(ctx) {
      // Need to call the wrapped components getInitialData if it exists
      return Page.getInitialData
        ? Page.getInitialData(ctx)
        : Promise.resolve(null);
    }

    static contextTypes = {
      shoebox: PropTypes.any
    };

    constructor(props, context) {
      super(props);

      const shoeboxKeyProps = {};
      if (props.match) {
        shoeboxKeyProps.match = props.match;
      }

      /*
      My rudimentary attempt at generating a unique ID for each component 
      with getInitialData based on its name and route params 
      */
      this.shoeboxId =
        props.dataKey ||
        `${getDisplayName(Page)}${
          Object.keys(shoeboxKeyProps).length ? `_${hash(shoeboxKeyProps)}` : ''
        }`;

      let shoeboxData;
      if (context && context.shoebox && context.shoebox.data) {
        shoeboxData = context.shoebox.data[this.shoeboxId];
      }

      this.state = {
        data: shoeboxData,
        isLoading: shoeboxData ? false : true
      };

      this.ignoreLastFetch = false;
    }

    componentDidMount() {
      if (!this.state.data) {
        this.fetchData();
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props !== prevProps) {
        this.ignoreLastFetch = false;
        this.fetchData();
      }
    }

    componentWillUnmount() {
      this.ignoreLastFetch = true;
    }

    fetchData = async () => {
      // if this.state.data is null, that means that the we are on the client.
      // To get the data we need, we just call getInitialData again on mount.
      if (!this.ignoreLastFetch) {
        this.setState({ isLoading: true });
        return this.constructor
          .getInitialData({ match: this.props.match })
          .then(
            data => {
              this.setState({ data, isLoading: false });
              return data;
            },
            error => {
              this.setState(state => ({
                data: { error },
                isLoading: false
              }));
              return { error };
            }
          );
      }
    };

    render() {
      // Flatten out all the props.
      const { initialData, ...rest } = this.props;

      //  if we wanted to create an app-wide error component,
      //  we could also do that here using <HTTPStatus />. However, it is
      //  more flexible to leave this up to the Routes themselves.
      //
      // if (rest.error && rest.error.code) {
      //   <HttpStatus statusCode={rest.error.code || 500}>
      //     {/* cool error screen based on status code */}
      //   </HttpStatus>
      // }

      return (
        <Page
          {...rest}
          refetch={this.fetchData}
          isLoading={this.state.isLoading}
          data={this.state.data}
        />
      );
    }
  }

  SSR.displayName = `SSR(${getDisplayName(Page)})`;
  return SSR;
}

// This make debugging easier. Components will show as SSR(MyComponent) in
// react-dev-tools.
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
