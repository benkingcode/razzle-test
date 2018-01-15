import Loadable from 'react-loadable';
import Loading from 'festicket/components/Loading';

export default Loadable({
  loader: () =>
    import(/* webpackChunkName: 'About' */ 'festicket/components/WebShell/About/component'),
  loading: Loading
});
