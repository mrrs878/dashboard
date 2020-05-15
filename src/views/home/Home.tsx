import React from 'react';

import style from './index.module.less';
import lazyLoad from '../../components/MLazyLoad';

const weChatImg = require('../../assets/images/wechat.png');

const ImageNode = () => <img className={style.itemImg} data-src="https://mrrsblog.oss-cn-shanghai.aliyuncs.com/vue-5.png" alt="" />;

interface PropsI {
}

const Home: React.FC<PropsI> = () => (
  <div className="container">
    <div className={style.itemContainer}>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
    </div>
    <div className={style.itemContainer}>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
    </div>
    <div className={style.itemContainer}>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
    </div>
    <div className={style.itemContainer}>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
    </div>
    <div className={style.itemContainer}>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
    </div>
    <div className={style.itemContainer}>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
      <div className={style.item}>
        <img className={style.itemImg} src={weChatImg} alt="" />
      </div>
    </div>
    <div className={style.itemContainer}>
      {
        ['a', 's', 'd', 'f'].map((item) => (
          <div className={style.item} key={item}>
            {
              lazyLoad(ImageNode)
            }
          </div>
        ))
      }
    </div>
  </div>
);

export default Home;
