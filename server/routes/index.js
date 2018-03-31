const router = require('koa-router')()
const mongoose = require('./../db');
const Calousel = require('./../models/carousel');
const fs = require('fs');
const WebSet = require('./../models/websetting');
const Tabs = require('./../models/tabs');
const Aritics = require('./../models/artic');
const multer = require('koa-multer');//加载koa-multer模块
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({storage: storage});

router.post('/upload', upload.single('logo'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename//返回文件名
  }
})

router.get('/getcarousels', async (ctx) => {
  let {page, limit} = {...ctx.request.query};
  let pages = parseInt(page);
  let limits = parseInt(limit);
  let skip = (pages - 1) * limits;
  let calDoc = await Calousel.find({}).skip(skip).limit(limits).exec();
  let total = await Calousel.count({});
  if (calDoc) {
    ctx.body = {
      code: 0,
      msg: '获取轮播图数据成功',
      result: calDoc,
      total: total
    };
  }
});

router.post('/changeStatus', async (ctx) => {
  let {status, id, name} = {...ctx.request.body};
  if (id || status) {
    let state = status ? false : true;
    let userDoc = await Calousel.findOneAndUpdate({_id: id}, {
      $set: {
        status: state,
        name,
        ip: getIp(ctx),
        time: getTimes()
      }
    });
    ctx.body = {
      code: 2,
      msg: '修改成功',
      result: userDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误',
      result: []
    };
  }
});

// delCalsouel
router.post('/delCalsouel', async (ctx) => {
  let {id} = {...ctx.request.body};
  if (id) {
    let delDoc = await Calousel.remove({_id: id});
    if (delDoc) {
      ctx.body = {
        code: 3,
        msg: '删除成功',
        result: delDoc
      };
    } else {
      ctx.body = {
        code: 10002,
        msg: '删除失败'
      };
    }
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误'
    };
  }
});

router.post('/addCalsouer', async (ctx) => {
  let {avatar, name, url, describe} = {...ctx.request.body};
  if (avatar) {
    let calDoc = await Calousel.create({
      avatar: '/uploads/' + avatar,
      name: name,
      url: url,
      describe,
      ip: ctx.request.ip.slice(7),
      time: new Date().getTime(),
      status: true
    });
    ctx.body = {
      code: 2,
      msg: "添加成功",
      result: calDoc
    };
  } else {
    ctx.body = {
      code: 1001,
      msg: "参数错误",
      result: []
    };
  }
});

router.post('/updateCalsouel', async (ctx) => {
  let {avatar, name, url, describe, id} = {...ctx.request.body};
  let obj = {
    name,
    url,
    describe,
    time: new Date().getTime(),
    ip: ctx.request.ip.slice(7),
    avatar: avatar
  };
  if (id || avatar) {
    let calDoc = await Calousel.findOneAndUpdate({_id: id}, {
      $set: obj
    });
    ctx.body = {
      code: 1,
      msg: "修改成功",
      result: calDoc
    };
  } else {
    ctx.body = {
      code: 1001,
      msg: "参数错误",
      result: []
    };
  }
});

router.post('/updatewebs', async (ctx) => {
  let {title, phone, name, qq, logo, adders, beian} = {...ctx.request.body};
  let del = await WebSet.remove({}); // 只能设置一个 其他的删除掉
  let webDoc = await WebSet.create({
    title,
    phone,
    name,
    qq,
    logo: logo.startsWith('/uploads/') ? logo : ('/uploads/' + logo),
    adders,
    ip: getIp(ctx),
    time: getTimes(),
    beian
  });
  if (webDoc) {
    ctx.body = {
      code: 2,
      msg: '修改成功',
      result: webDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '保存失败',
      result: []
    };
  }
});

router.get('/getwebset', async (ctx) => {
  let WebSetDoc = await WebSet.findOne({});
  if (WebSetDoc) {
    ctx.body = {
      code: 0,
      msg: '获取数据成功',
      result: WebSetDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '获取失败',
      result: []
    };
  }
});

//添加标签
router.post('/addtabs', async (ctx) => {
  let {name, zh, en, color} = {...ctx.request.body};
  if (name || zh || en || color) {
    let tabsDoc = await Tabs.create({
      name,
      zh,
      en,
      ip: getIp(ctx),
      time: getTimes(),
      status: true,
      color: color,
      name: zh
    });
    ctx.body = {
      code: 2,
      msg: '添加成功',
      result: tabsDoc
    }
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误',
      result: []
    };
  }
});

router.get('/gettabs', async (ctx) => {
  let tabsDoc = await Tabs.find({});
  ctx.body = {
    code: 0,
    msg: '获取数据成功',
    result: tabsDoc
  };
});

router.post('/deltabs', async (ctx) => {
  let {id} = {...ctx.request.body};
  if (id) {
    let delDoc = await Tabs.remove({_id: id});
    ctx.body = {
      code: 3,
      msg: '删除成功',
      result: []
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数有误',
      result: []
    };
  }
});

router.post('/updatetabs', async (ctx) => {
  let {name, zh, color, id} = {...ctx.request.body};
  if (name || zh || color) {
    let updateDoc = await Tabs.update({_id: id}, {$set: {name: zh, zh, color, ip: getIp(ctx), time: getTimes()}});
    ctx.body = {
      code: 2,
      msg: '修改成功',
      result: updateDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误',
      result: []
    };
  }
});

router.post('/addnews', async (ctx) => {
  let {name, fenmian, body, title, tabs} = {...ctx.request.body};
  let ariticDoc = await Aritics.create({
    name,
    fenmian: fenmian ? '/uploads/' + fenmian : '',
    body,
    title,
    tabs: JSON.parse(tabs),
    ip: getIp(ctx),
    time: getTimes(),
    status: true
  });
  if (ariticDoc) {
    ctx.body = {
      code: 2,
      msg: '添加成功',
      result: ariticDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '添加失败',
      result: []
    };
  }
});

router.get('/getaritic', async (ctx) => {
  let {edit, id} = {...ctx.request.query}; // 如果edit id 存在就是修改
  if (edit || id) {
    let ariticDoc = await Aritics.findOne({_id: id});
    ctx.body = {
      code: 0,
      msg: '获取数据成功1',
      result: ariticDoc
    };
  } else {
    let {page, limit} = {...ctx.request.query};
    let pages = parseInt(page);
    let limits = parseInt(limit);
    let skip = (pages - 1) * limits;
    let ariticDoc = await Aritics.find({}).skip(skip).limit(limits).exec();
    let total = await Aritics.count({});
    ctx.body = {
      code: 0,
      msg: '获取数据成功',
      result: ariticDoc,
      total: total
    };
  }
});

router.post('/delAritic', async (ctx) => {
  let {id} = {...ctx.request.body};
  if (id) {
    let delDoc = await Aritics.remove({_id: id});
    ctx.body = {
      code: 3,
      msg: '删除成功',
      result: []
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '缺少参数',
      result: []
    };
  }
});

router.post('/statusaritic', async (ctx) => {
  let {id, status} = {...ctx.request.body};
  if (id) {
    let aDoc = await Aritics.update({_id: id}, {$set: {status: status}});
    ctx.body = {
      code: 1,
      msg: '修改成功',
      result: aDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '缺少参数',
      result: []
    };
  }
});

router.post('/updatearitic', async (ctx) => {
  let {name, fenmian, body, title, tabs, id} = {...ctx.request.body};
  if (id || tabs || title) {
    let updateDoc = await Aritics.update({_id: id}, {
      $set: {
        name,
        fenmian: fenmian.startsWith('/uploads/') ? fenmian : '/uploads/' + fenmian,
        body,
        title,
        tabs: JSON.parse(tabs),
        ip: getIp(ctx),
        time: getTimes()
      }
    });
    ctx.body = {
      code: 2,
      msg: '修改成功',
      result: updateDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误',
      result: []
    }
  }


});

function getIp(x) {
  return x.request.ip.slice(7);
}

function getTimes() {
  return new Date().getTime();
}

module.exports = router
