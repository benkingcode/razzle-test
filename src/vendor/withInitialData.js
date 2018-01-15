import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';

// This is a Higher Order Component that abstracts duplicated data fetching
// on the server and client.
export default function withInitialData(Page) {
  class withInitialData extends React.Component {
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

      const { history, location, staticContext, ...shoeboxKeyProps } = props;

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
      if (
        context &&
        context.shoebox &&
        context.shoebox.data &&
        this.shoeboxId in context.shoebox.data
      ) {
        shoeboxData = context.shoebox.data[this.shoeboxId];

        this.state = {
          data: shoeboxData,
          treeWalking: context.treeWalking,
          isLoading: false
        };

        if (typeof window !== 'undefined') {
          delete context.shoebox.data[this.shoeboxId];
        }
      } else {
        this.state = {
          treeWalking: context.treeWalking,
          isLoading: true
        };
      }

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

    inParallel = Page.inParallel;

    fetchData = async () => {
      // if this.state.data is null, that means that the we are on the client.
      // To get the data we need, we just call getInitialData again on mount.
      if (!this.ignoreLastFetch) {
        this.setState({ isLoading: true });

        return this.constructor
          .getInitialData(this.props)
          .then(data => {
            this.setState({ data, isLoading: false });
            return data;
          })
          .catch(error => {
            this.setState(state => ({
              error,
              isLoading: false
            }));
            return null;
          });
      }
    };

    render() {
      //  if we wanted to create an app-wide error component,
      //  we could also do that here using <HTTPStatus />. However, it is
      //  more flexible to leave this up to the Routes themselves.
      //
      // if (rest.error && rest.error.code) {
      //   <HttpStatus statusCode={rest.error.code || 500}>
      //     {/* cool error screen based on status code */}
      //   </HttpStatus>
      // }

      if (this.state.error) {
        const InitPage = new Page();
        if ('error' in InitPage && typeof InitPage.error === 'function') {
          return <InitPage.error />;
        }

        return null;
      }

      if (this.state.isLoading && !this.state.treeWalking) {
        const InitPage = new Page();
        if ('loading' in InitPage && typeof InitPage.loading === 'function') {
          return <InitPage.loading />;
        }

        return null;
      }

      return (
        <Page {...this.props} refetch={this.fetchData} data={this.state.data} />
      );
    }
  }

  withInitialData.displayName = `withInitialData(${getDisplayName(Page)})`;
  return withInitialData;
}

// This make debugging easier. Components will show as withInitialData(MyComponent) in
// react-dev-tools.
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}