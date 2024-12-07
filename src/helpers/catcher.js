// import { useLoading } from 'vue-loading-overlay';
// import { useToast } from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-sugar.css';
// import 'vue-loading-overlay/dist/css/index.css';
import { toast, loading } from './instance';

export default function catcher(functionExec, errorCb, finallyCb) {
  const load = loading.show();

  functionExec()
    .catch((error) => {
      console.log(error.response?.data?.message || error.message || 'an error occurred');
      toast.error(error.response?.data?.message || error.message || 'an error occurred');

      if (errorCb) {
        errorCb();
      }
    })
    .finally(() => {
      load.hide();

      if (finallyCb) {
        finallyCb();
      }
    });
}
