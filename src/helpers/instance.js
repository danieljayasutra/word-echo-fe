import { useToast } from 'vue-toast-notification';
import { useLoading } from 'vue-loading-overlay';
import 'vue-toast-notification/dist/theme-sugar.css';
import 'vue-loading-overlay/dist/css/index.css';

export const toast = useToast({
  position: 'top',
  duration: 3000,
});

export const loading = useLoading({
  backgroundColor: '#000',
  opacity: 0.2,
});
