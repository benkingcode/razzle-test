import Loadable from 'react-loadable';
import Loading from 'festicket/components/Loading';

export default Loadable({
  loader: () => import('./component'),
  loading: Loading
});
