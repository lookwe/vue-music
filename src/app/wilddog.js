/**
 * Created by Administrator on 2019/2/19.
 */
import * as wilddog from 'wilddog'

const config = {
  syncURL: 'https://wd1841756677tscqzo.wilddogio.com/'
}
wilddog.initializeApp(config)
export default wilddog.sync().ref('web')
