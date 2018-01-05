import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Button } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import { MessageBox } from 'mint-ui';

Vue.prototype.$toast = Toast;
Vue.prototype.$message = MessageBox;

Vue.use(MintUI);
Vue.use(Lazyload);
Vue.component(Button.name, Button);

