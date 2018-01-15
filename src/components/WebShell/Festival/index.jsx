import Loadable from 'react-loadable';
import Loading from 'festicket/components/Loading';

export default Loadable({
  loader: () => import('festicket/components/WebShell/Festival/component'),
  loading: Loading
});
