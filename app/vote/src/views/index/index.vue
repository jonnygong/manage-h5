<template>
  <!--modal-open-->
  <div :class="['wrapper', modal ? 'modal-open' : '']"
       :style="{backgroundColor: `${otherData.body_bgc}`}">
    <div class="header">
      <img :src="otherData.header" alt="">
    </div>
    <div class="container">
      <div :class="['notice', loadMore ? 'notice--display' : 'notice--hidden']"
           :style="{fontSize: `${otherData.rule_fontsize}rem`, color: `${otherData.rule_color}`}"
           v-html="otherData.rule"></div>
      <div class="load-more">
        <span class="load-more__btn load-more__btn--enable"
              :style="{backgroundColor: `${otherData.button_bgc}`, color: `${otherData.button_color}`}"
              @click="handleMore">{{loadMore ? '隐藏': '显示'}}更多规则</span>
      </div>
      <div class="container__content">
        <div class="category" v-for="(category, index) in listData" :key="index">
          <div class="category__title" :style="{backgroundColor: `${otherData.cat_bgc}`}">
            <div class="category__title__icon" :style="{backgroundImage: `url(${otherData.cat_icon})`}">
            </div>
            <p class="category__title__text">
              {{category.title}}(共{{category.spots.length}}处，已勾选{{category.checkedList.length}}个)
            </p>
          </div>
          <div class="category__list">
            <div class="point"
                 :style="{flexBasis: `${100 / otherData.col_num}%`}"
                 v-for="(spot, index) in category.spots" :key="spot.id">
              <div class="point__img" @click="handleClick(spot)">
                <img v-lazy="spot.img" alt="">
              </div>
              <div class="point__text">{{`${spot.title}（${voteList[spot.id]}票）`}}</div>
              <div class="point__action">
                <input type="checkbox"
                       :id="spot.id"
                       :value="spot.id"
                       v-model="spot.checked" @change="checkInput(category, spot)">
                <label :for="spot.id">投它一票</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container__footer">
        <button class="container__footer__btn container__footer__btn--enable"
                :style="{backgroundColor: `${otherData.button_bgc}`, color: `${otherData.button_color}`}"
                @click="submitVote">马上投票
        </button>
      </div>
    </div>
    <div class="modal" v-show="modal" @click="handleClose">
      <div class="detail"
           :style="{backgroundImage: `url('${otherData.modal_bg}')`, backgroundColor: `${otherData.modal_color}`, backgroundSize: 'cover' }"
           @click.stop="">
        <div class="detail__close" @click="handleClose"></div>
        <div class="detail__img">
          <img v-lazy="curSpot.img" alt="">
          <a :href="curSpot.url"
             target="_blank"
             class="detail__img__url" v-if="curSpot.url !== ''">查看详情</a>
        </div>
        <div class="detail__scroll" ref="wrapper">
          <div class="detail__text">
            <p class="detail__text__title">{{curSpot.title}}（{{voteList[curSpot.id]}}票）</p>
            <p class="detail__text__info"
               v-html="curSpot.info"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="follow"
         @touchmove.prevent=""
         @click="closeFollow"
         v-show="followDisplay">
      <img :src="otherData.qrcode" alt="" class="follow__img">
      <div class="follow__text"
           v-html="otherData.attention">
      </div>
    </div>
    <div class="vote-count"
         v-show="allChecked.length > 0">
      已勾选 {{ allChecked.length }} 个
    </div>
    <div class="partner"
         v-show="otherData.follow.length > 0">
      <a class="partner__item"
         v-for="(item, index) in otherData.follow"
         :key="index"
         :href="item.url">{{item.name}}</a>
    </div>
  </div>
</template>

<script>
  // 防止背景遮罩底层滚动
  function _stopPrevent(e) {
    e.preventDefault();
  }

  import BScroll from 'better-scroll';

  export default {
    name: 'index',
    data() {
      return {
        modal: false,
        followDisplay: false,
        scroll: null,
        loadMore: false,
        curSpot: {
          id: 0,
          img: '',
          title: '',
          info: '',
          url: '',
          checked: false
        },
        voteList: {},
        allChecked: [],
        "listData": [
          {
            "title": "餐厅列表",
            "checkedList": [],
            "spots": [
              {
                "id": 53,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/56.jpg",
                "title": "爱啤精酿吧",
                "info": "钱塘江边一家精致的PUB，主打精酿啤酒。爱啤配备了专业的酿酒设备，并且将酿造好的啤酒直接用管道通往吧台，主打的5款啤酒「小麦、大麦、比尔森、黑啤和IPA」味道各有千秋。除此之外，这里还有烧烤，以及广式烤鸭、开化清水鱼、霹雳娇蛙等各种中式菜肴。 <br/> 地址：滨江区闻涛路1852号13-15商铺",
                "url": "",
                "checked": false
              },
              {
                "id": 54,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/77.jpg",
                "title": "阿贵黄牛小馆",
                "info": "冬天特别适合吃牛肉火锅，阿贵黄牛小馆就是一个不错的选择。还没走进门，你便能感受到一股温热的牛肉气味铺面而来。这里的牛肉火锅和别家可不打一样，主打熟的黄牛肉、牛筋、牛杂等，锅底是统一的牛骨汤，清汤可以直接喝，熟牛肉牛杂和牛筋一烫又嫩又滑，值得一试。<br/> 地址：滨江区滨盛路3867号宝龙城商业街2楼",
                "url": "",
                "checked": false
              },
              {
                "id": 55,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/102.jpg",
                "title": "彼蓝湾",
                "info": "彼蓝湾来自于地中海之滨的斯洛文尼亚，它的内部环境以蓝色为主调，点缀丰富的绿植，整体显得非常清新。斯洛文尼亚菜主要以煎和烤为主，讲究食材新鲜，并且很少使用调味品，比如彼蓝湾的招牌菜鲈鱼和烤肋排，基本上除了盐和胡椒之外，只用到芹菜叶之类的天然香料。<br/> 地址：滨江区江南大道228号星光国际广场4幢101室",
                "url": "",
                "checked": false
              },
              {
                "id": 56,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/60.jpg",
                "title": "草原牧羊",
                "info": "草原牧羊有着来自呼伦贝尔大草原的羊肉——吃天然有机牧草，喝纯净泉水长大的草原羊。其肉质更加紧实细嫩，也不会有激素和污染，更重要的是还得经过排酸这一道工序。草原牧羊的有机排酸肉，是挑选了羊身上比较精瘦的部位，经过72小时的排酸加工而成的。1斤的原肉，最后只能剩下7两，既费时也耗成本。<br/> 地址：滨江区江陵路2028号星耀城一期3座2楼",
                "url": "",
                "checked": false
              },
              {
                "id": 57,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/76.jpg",
                "title": "潮虾",
                "info": "潮虾是老头儿油爆虾旗下的品牌，以虾、蟹锅为主打特色，而装修风格却是大胆前卫，潮味儿十足。力荐他们家的香辣肉蟹锅——饱满的肉蟹、肥美的鸡爪搭配丰富的蔬菜，再淋上浓郁的酱汁，十足咸鲜醇香、麻辣爽口的好滋味。口味分香辣和酸汤两种：香辣味选用缅甸蟹，个儿大饱满；酸汤味的主角则是湖蟹，肉细嫩少腥味。<br/> 地址：滨江区滨盛路1766号星光大道二期北楼3楼305室",
                "url": "",
                "checked": false
              },
              {
                "id": 58,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/88.jpg",
                "title": "凑凑火锅·茶憩",
                "info": "湊湊的火锅采用了香炉工艺浇铸而成，从锅体外侧还能看到古色古香的纹路。台式麻辣锅是必点的锅底，用鸡骨、牛骨、数十种中药材，熬煮 6-8 小时而成。而且锅底中牛油、辛香料的用量控制得恰到好处，不仅更养生，不易上火，也让惹人厌的油烟气大大减少，吃完挥挥衣袖，不带走一丝火锅味。<br/> 地址：滨江区江汉路1515号龙湖滨江天街7楼01b",
                "url": "",
                "checked": false
              },
              {
                "id": 59,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/65.jpg",
                "title": "稻合居酒屋",
                "info": "稻合是一家深藏在街边的日料小馆。老板说，开店的初衷是想老了有个地方，和朋友们喝喝酒，吹吹牛，于是取名“稻合”——稻为粮食，是酿酒之物，又有谐音“志同道合”之意。稻合主打寿司，最亮眼的便是集芝士寿司、芒果寿司、金枪鱼寿司等九款不同寿司的绣球九宫格，饭团紧实适度、口感丰富。<br/> 地址：滨江区江汉路1785号双城国际2幢106号",
                "url": "",
                "checked": false
              },
              {
                "id": 60,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/99.jpg",
                "title": "东北风",
                "info": "作为一家吃东北菜的餐厅，东北风可以说是深得精髓了，那就是量非常大。几乎每个盘子又大又满，看着都觉得实在。酱骨头几乎是每桌必点，也是他们家的招牌，一份6根，每根都是满满的肉，胃口小的女生恐怕只吃一根就要打饱嗝了。<br/> 地址：滨江区江汉路1515号龙湖滨江天街6楼",
                "url": "",
                "checked": false
              },
              {
                "id": 61,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/73.jpg",
                "title": "疯辣火锅",
                "info": "不得不说，光看这个名字就被辣到了。疯辣火锅的麻辣锅底分为微辣、中辣、重辣三种；辣椒、花椒铺满锅内，不时冒起香气，泪水情不自禁地在眼眶里打转，真真是辣出的泪水。推荐招牌疯辣鱼，秘制辣鱼肉表面加了一层厚厚的干辣椒，不是一般鱼肉和辣鱼肉可以比的，分分钟挑战你的舌尖神经。<br/> 地址：滨江区滨盛路3867号宝龙城商业街1区3号楼2层",
                "url": "",
                "checked": false
              },
              {
                "id": 62,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/89.jpg",
                "title": "福朋喜来登酒店宜客乐西餐厅",
                "info": "虽说藏身在豪华酒店，但宜客乐西餐厅其实也是对外开放的，环境优雅、无限量自助。这里中午有精选的港式茶点，每天轮替不重样；晚上的美食种类则更加多：烧烤、火锅、甜点......想吃什么就拿什么，更让人惊喜的是还有一个海鲜小炒档，可以现点、现捞、现炒。<br/> 地址：滨江区东信大道868号福朋喜来登酒店2楼",
                "url": "",
                "checked": false
              },
              {
                "id": 63,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/93.jpg",
                "title": "丰和日丽",
                "info": "丰和日丽作为一家精品宁波菜餐厅，精致的环境和菜品是非常适合聚会宴请。主打的是海鲜，其中膏蟹，满满的都是红膏，非常诱人。雪菜黄鱼汤馄饨，黄鱼味道鲜美，配上如汤馄饨。双椒蒸蛏子，用比较肥美的蛏子，搭配红椒和黄椒，肉质鲜嫩辣爽。此外，还有很多宁波小吃。<br/> 地址：滨江区江汉路1515号龙湖滨江天街L7",
                "url": "",
                "checked": false
              },
              {
                "id": 64,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/95.jpg",
                "title": "沸地海鲜姿造音乐餐吧",
                "info": "沸地有着音乐餐吧的环境，主打中高端海鲜小火锅。一人一口精致的小锅，招牌花胶鲍鱼锅汤底金黄诱人，每天需要熬上4、5个小时，是典型的浓汤锅，味道醇厚。食材也是新鲜现杀，阿拉斯加珍宝蟹、澳洲龙虾......在送入厨房前，它们全都在进门处的海鲜池里活蹦乱跳着。<br/> 地址：滨江区闻涛路1852-10号",
                "url": "",
                "checked": false
              },
              {
                "id": 65,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/66.jpg",
                "title": "古竹",
                "info": "古竹主打“原生态开化菜”，60%的食材都来自开化本地，而且大多采用土烧的烹饪方法，将开化菜咸鲜中带着辣的味觉体验展现得淋漓尽致；加上老板又是一个非常追求完美的人，自己不满意的菜绝不上菜单。来这里必尝开化清水鱼，清水鱼常年生长在水温较低的山泉水中，以水里的青草为食物，营养丰富，肉质鲜美。<br/> 地址：滨江区春晓路61号中赢康康谷6幢301",
                "url": "",
                "checked": false
              },
              {
                "id": 66,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/67.jpg",
                "title": "GO辣",
                "info": "GO辣最初以串串出名，而后来推出的牛蛙系列也是人气爆棚。鲜椒酸爽味、鲜椒紫苏味、香辣孜然味等15款美味牛蛙实在是让人挑花眼，每只牛蛙都精挑细选，肉质饱满。并且用碳火代替电烤炉，锅底下烧的是真正的木炭，火不大但温度很稳定，上桌之后持续慢火加热，边吃边聊也完全不用担心变凉。<br/> 地址：滨江区江汉路1515号龙湖滨江天街6楼45号",
                "url": "",
                "checked": false
              },
              {
                "id": 67,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/61.jpg",
                "title": "黑泽明",
                "info": "这家龙虾螃蟹料理店与日本导演黑泽明同名，并有着设计师张健的风格加持，走进来就像在看一场暗调电影。这里既适合朋友小聚，也有一方矩形吧专门留给一人食的小伙伴，冷醉小龙虾、熟醉阳澄湖大闸蟹都是值得一试的菜品，肉质鲜甜并且带着酒的香味。<br/> 地址：滨江区滨盛路3867号宝龙城商业街1楼150－158号",
                "url": "",
                "checked": false
              },
              {
                "id": 68,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/69.jpg",
                "title": "狐狸爱上椰子鸡",
                "info": "狐狸爱上椰子鸡主打来自海南的椰子鸡火锅。食材选用当地的文昌鸡，100天放养当地椰林，30天笼养育肥，肉质鲜嫩，皮肥而不腻；椰青锅底每天按比例调制，鲜甜清水。两者只要在一起煮上5分钟，就能产生美妙的化学反应：汤汁清甜、鸡肉嫩滑爽口。如果再搭配野生竹荪、野生珍珠马蹄等“黄金配角”，味道则更加丰富。<br/> 地址：滨江区丹枫路1075号雪峰银座2楼",
                "url": "",
                "checked": false
              },
              {
                "id": 69,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/84.jpg",
                "title": "海边渔村",
                "info": "海边渔村有一艘专门从舟山运过来的“退役”航船，被打造成了一个包间，坐在上面吃海鲜，感觉酷酷的。店里所用到的海鲜食材品种繁多且新鲜，每天由舟山的沈家门渔船码头运送到杭州，然后养在餐厅的鱼缸里。活鱼现点现杀，再由来自舟山的大厨会用当地的正宗烧法，还原出一道道美味。<br/> 地址：滨江区浦沿路773号盒座社5楼",
                "url": "",
                "checked": false
              },
              {
                "id": 70,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/91.jpg",
                "title": "海边餐厅",
                "info": "对于海鲜来说，蒸的吃法最大程度上保留了海鲜的原味和鲜度。海边餐厅的海鲜当天采购保证了新鲜，口味上也有不同辣度可供选择，招牌虾兵蟹将海鲜大咖包含了龙虾、皮皮虾、扇贝、花蛤等各种美味，用量大、味道鲜，可以尽情约上三五好友去享受一顿海陆空的饕餮盛宴。<br/> 地址：滨江区滨和路998号中赢国际1楼1242室",
                "url": "",
                "checked": false
              },
              {
                "id": 71,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/70.jpg",
                "title": "卡巴瑞典餐厅",
                "info": "滨江乃至整个杭州都不多见的瑞典菜餐厅。菜品讲究食材的新鲜和原汁原味，调味的重心一般放在酱料上，而不着眼于食物本身。因此你会发现，卡巴的大部分菜都有专门的配酱。比如店里的招牌——卡巴薄底披萨。卡巴烤肉色泽诱人，散发微微酸味的减少油腻感，而秘制酱无疑是点睛之笔，共有辣、蒜以及酸奶三种口味可选。<br/> 地址：滨江区滨盛路1766号星光大道二期3楼",
                "url": "",
                "checked": false
              },
              {
                "id": 72,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/82.jpg",
                "title": "开心丽果",
                "info": "大冬天就不能喝鲜榨果汁了？不存在的，开心丽果有别出心裁的“暖暖果汁热饮”。包括牛油果能量饮、招牌芒果、清新百香、招牌石榴、雪梨汁、胡萝卜汁、甘蔗汁、雪梨甘蔗小青柠等等都可以选择加热饮用，加上是水果现榨的，新鲜健康有营养。<br/> 地址：滨江区江汉路1515号龙湖滨江天街3楼",
                "url": "",
                "checked": false
              },
              {
                "id": 73,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/57.jpg",
                "title": "祿锦鸡",
                "info": "祿锦鸡是一家专门吃鸡煲的餐厅，选材大名鼎鼎的广东清远鸡，12款与众不同的鸡煲全部由厨师团队自行研发，榴莲鸡煲、椰香鸡煲、咖喱鸡煲和麻辣鸡煲是店内的四大招牌。人气王榴莲鸡煲最多一天能卖出80多份，榴莲软糯绵密，鸡肉香嫩爽滑，堪称一对黄金搭档。<br/> 地址：滨江区江汉路1515号龙湖滨江天街6楼",
                "url": "",
                "checked": false
              },
              {
                "id": 74,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/90.jpg",
                "title": "捞王",
                "info": "捞王堪称火锅界的一股清流，不以热辣为主，而是以温润滋补见长。吃捞王火锅极其讲究，要先喝汤然后吃菌菇类，接下来吃海鲜、肉类、蔬菜，这样一来味道层层叠叠，既不会太清淡也不至于过分油腻。胡椒猪肚鸡是捞王的“三宝”之一，精选了来自丹麦的厚实猪肚，搭配以海南的胡椒来提味，24小时不熄火细煮慢熬而成，呈现出奶白色，味道鲜美。<br/> 地址：滨江区江汉路1515号龙湖滨江天街6楼",
                "url": "",
                "checked": false
              },
              {
                "id": 75,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/94.jpg",
                "title": "粒粒堡亲子餐厅",
                "info": "从帝都火到魔都，一开业就人气爆棚，此前还有许多杭州妈妈特意带孩子去上海体验，这回落地滨江确实是个大大的好消息。滨江这家店的设计风格简约大气，怎么看都看不腻，服务贴心、美食诱人，更重要的是还有专门的儿童玩乐区域，简直让妈妈们放飞自我。<br/> 地址：滨江区江汉路1515号龙湖滨江天街L2",
                "url": "",
                "checked": false
              },
              {
                "id": 76,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/104.jpg",
                "title": "蓝蛙",
                "info": "这是杭州城里的第三家蓝蛙，西餐厅＋酒吧的模式颇受年青人欢迎。白天的蓝蛙是一家美式餐厅，供应着各类特色的汉堡，薯条以及意面，每一件美食都透露出美国人的实在和巨大的分量。夜晚的蓝蛙提供着上百种的酒品，总能让你找到一杯心仪的口味。<br/> 地址：滨江区江汉路1515号龙湖滨江天街101-18",
                "url": "",
                "checked": false
              },
              {
                "id": 77,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/55.jpg",
                "title": "摩奇先生",
                "info": "摩奇先生是一家特别的花园餐厅，藏身在滨江天街顶楼。整体工业风的布局搭配水晶吊灯、随处可见的绿色植物、软垫靠背的欧式椅子......一切都显得美感十足；而来源于世界各地的精酿生啤、出自米其林三星顶级大厨的创意美食，则更能让人沉醉其中，尤其适合朋友聚会。<br/>地址：滨江区汉江路与江南大道交叉口滨江龙湖天街7F-03B  ",
                "url": "",
                "checked": false
              },
              {
                "id": 78,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/74.jpg",
                "title": "鳗诚屋",
                "info": "说到烤鳗鱼，这家被称为“鳗鱼专营店”的鳗诚屋绝对是诚意十足。由拥有51年烤龄的日本老师傅亲自坐镇，带来正宗的关西烤法——活鳗鱼现杀现烤，直至烤熟，呈现出油香四溢的满足感。鳗诚屋的酱汁也是来自日本的独门秘方，拥有96年历史，去腥又下饭，是一碗鳗鱼饭的点睛之笔。<br/> 地址：滨江区滨盛路3867号宝龙城3幢101-5室",
                "url": "",
                "checked": false
              },
              {
                "id": 79,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/78.jpg",
                "title": "漠南蒙古煨炉餐厅",
                "info": "漠南是一家来自内蒙古大草原的餐厅，精选当地的羊肉食材和香料，并由内蒙古大厨亲自掌勺。冬天去漠南，必定要点一锅热乎乎的龙骨汤，汤头用羊腿骨每天早上新鲜熬制，一般要花上3-4个小时，一出锅必定是浓香四溢。再加上羊排肉一起清炖，过程中不加调料，只放党参和枸杞，原汁原味的同时滋阴补气。<br/> 地址：滨江区滨盛路与安业路交叉口(君尚金座102)",
                "url": "",
                "checked": false
              },
              {
                "id": 80,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/81.jpg",
                "title": "明洞韩国料理",
                "info": "说起明洞韩国料理，滨江人应该都不会陌生。在星光大道9年，周边的餐厅换了几茬，明洞却始终屹立不倒。很多吃货关于韩料的最初记忆，或许就在这个400平的屋子里。明洞有着各式各样的韩式烤肉，比如五花肉、调味牛排、牛腩排等等，味道好、操作也方便，不需要铺纸和抹油，直接把肉往烤架上扔就可以了。<br/> 地址：滨江区江南大道228号星光国际广场1-101",
                "url": "",
                "checked": false
              },
              {
                "id": 81,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/59.jpg",
                "title": "怒汉",
                "info": "看到这个霸气的名字，你可能根本猜不出这竟然是一家吃鱼的餐厅。说起来，在怒汗的菜单上也就老坛酸菜鲈鱼一道大菜。每条重约一斤的鲈鱼，捕捞后在水库里清养一周才被送到店里，祛除河腥和土味。吃法是现点现杀，鱼片只有大约2毫米厚，肉质滑嫩，味道又酸又麻。<br/> 地址：滨江区江汉路1515号龙湖滨江天街B1-15",
                "url": "",
                "checked": false
              },
              {
                "id": 82,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/97.jpg",
                "title": "楠朋友",
                "info": "一家温馨的私房菜，主做台州海鲜，据说在当地也是一家网红级别的餐厅。最受欢迎的当属皮皮虾，不管是煲还是椒盐，皮皮虾只只带膏，非常入味，两个人吃一个煲吃到撑。最神奇的是大闸蟹炖酒，一不小心连汤都喝会个精光，让人惊叹原来大闸蟹都可以做成甜品。<br/> 地址：滨江区江陵路2028号星耀城一期2栋107",
                "url": "",
                "checked": false
              },
              {
                "id": 83,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/98.jpg",
                "title": "NIUNIUPARK",
                "info": "天街顶楼一家环境与口味俱佳的西餐厅。这里不只有各色牛排，甚至还可以吃到活的北极贝，还是现杀的。帝王蟹松叶蟹也可以现挑现做，点一只松叶蟹可以两吃，半只做低温半只做桥底辣蟹，低温做法蟹腿肉Q弹，处理过的蟹腿吃起来很方便，桥底辣蟹味道足，配着炸蒜末非常香。<br/> 地址：滨江区江汉路1515号龙湖滨江天街7F-703",
                "url": "",
                "checked": false
              },
              {
                "id": 84,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/80.jpg",
                "title": "Pizza Marzano玛尚诺",
                "info": "Pizza Marzano和Pizza Express属于同一血统，专做正宗的意式比萨，无论是香、脆、薄到葱油饼一样的饼底，还是番茄酱，全部手工制作。另外值得一提的是，他们家厨房里面没有煎锅、没有微波炉，所有菜单上能看到的美味都从巨大的烤炉中而来，够香够美味。<br/> 地址：滨江区江汉路1515号龙湖滨江天街1F35-36",
                "url": "",
                "checked": false
              },
              {
                "id": 85,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/83.jpg",
                "title": "青蜂",
                "info": "青蜂坐落在滨江高大上CBD裙楼里的梦幻玻璃房，在西餐厅、咖啡馆、酒吧模式间切换自如，价格也算比较接地气，因此口碑一向不错。这里的餐厅走的也精致路线，比如各式各样的牛排、精致甜品以及美酒佳酿，最适合周末约上朋友小聚。<br/> 地址：滨江区通和路中财大厦1楼",
                "url": "",
                "checked": false
              },
              {
                "id": 86,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/101.jpg",
                "title": "柒园",
                "info": "如果你在入夜后爬上天街顶楼，必定会被柒园所吸引——它犹如一颗抓人眼球的钻石，在空旷的露台发光发亮。而去吃过的朋友想必也应该尝得出来，这家店的味道和已经经营了13年的老店很像，事实上，柒园正是龙井路柒号花园餐厅旗下品牌。这里不仅有诸多经典美味，还有不少创新菜品。<br/> 地址：滨江区江汉路1515号龙湖滨江天街7楼L7-01a",
                "url": "",
                "checked": false
              },
              {
                "id": 87,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/103.jpg",
                "title": "热血兄弟炭火烧肉",
                "info": "“热血兄弟”日式炭火烧肉缘起于日本静冈县的“热血先生”烤肉店，由4位情同兄弟的热血男儿创立，遵循正宗的日式理念。食材选择了非常接近日本和牛品质的澳洲黑毛和牛、大连雪龙黑牛，以及出口香港的“三元豚”猪肉，配以合伙人藤岛先生特别提供的秘制配方酱料，美味多汁、口感丰富。<br/> 地址：滨江区滨盛路3867号宝龙城商业街M-F1-002",
                "url": "",
                "checked": false
              },
              {
                "id": 88,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/96.jpg",
                "title": "山葵家",
                "info": "一家具有日式风格的高档料理餐厅。自2011年以来，山葵家已经在杭州各个区域扎根，知名度不低。山葵家在装修上花了不少心思，环境比日式居酒屋多了几分现代感，适合约会或者商务用餐，配上日式榻榻米的小包房，简洁中透着浓浓的禅意。再加上新鲜讲究的食材、地道的烹饪手法、不断创新的菜品，是一个品尝日料的不错选择。<br/> 地址：滨江区江汉路1515号龙湖滨江天街L6-8",
                "url": "",
                "checked": false
              },
              {
                "id": 89,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/64.jpg",
                "title": "天辣",
                "info": "绝对不用“二次油”的爆红川菜天辣，口碑极好。虽然一听名字就很辣，但实际环境确是小清新风格。店里的招牌沸腾大虾球是餐厅大厨自创的一道菜品，做法类似与沸腾鱼，看起来满满一锅的干辣椒，但虾肉的鲜美、汤汁的麻辣恰到好处，口感也无比爽滑。<br/> 地址：滨江区江汉路1515号龙湖滨江天街6楼",
                "url": "",
                "checked": false
              },
              {
                "id": 90,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/75.jpg",
                "title": "太兴",
                "info": "来自香港的太兴餐厅，深谙香港美食的精粹，将烧味、奶茶、菠萝包等香港经典美食无一不做到极致，与粤式小炒、靓汤等完美融合，是美食老饕们极心水的地道港式餐厅之一。不论是约会聚餐，还是惬意的下午茶，又或者一个简约的工作餐，在太兴都能得到满足。<br/> 地址：滨江区江汉路1515号龙湖滨江天街L6-10",
                "url": "",
                "checked": false
              },
              {
                "id": 91,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/71.jpg",
                "title": "王爷的后厨",
                "info": "名字够霸气是很多人对这家店的第一印象，不过王爷的后厨却并非徒有其名。老板娘是一位性格豪爽的温州人，为了让更多吃货品味温州海鲜的鲜美，她对海食材要求极高，再加上原汁原味的烹饪方法和不错的环境，这里已经成为周边小伙伴的夜宵圣地。<br/> 地址：滨江区春晓路61号中赢康康谷5号",
                "url": "",
                "checked": false
              },
              {
                "id": 92,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/53.jpg",
                "title": " 湘绯",
                "info": "地道的湘菜馆子，从城西一路火到滨江。店里的菜式主要来自长沙、浏阳两地，做法偏“老底子”，唯一的改良就是减少了盐的用量，但在辣度上丝毫没有妥协。招牌剁椒鱼头活鱼现杀，且必须用两种辣椒——新鲜的红辣椒和酿过的黄色小米椒各一半，让人欲罢不能。<br/>  地址：火炬大道581号三维大厦A座1楼",
                "url": "",
                "checked": false
              },
              {
                "id": 93,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/54.jpg",
                "title": " 虾言海鲜餐厅",
                "info": "一家地道的台州小网海鲜餐厅。食材，是玉环本地渔民当天出海捕获的小网海鲜；做法，一般都是清蒸、水煮、家烧等台州当地的传统烹饪方式，强调“还原食材的本鲜”。除了适合朋友聚餐，虾言还有一道堪称招牌的单人套餐——虾言蟹语，总共包含海鲜拼盘、小黄鱼、鱼皮馄钝等5种菜品，依次上菜，专为“孤独的美食家”们准备。<br/>地址：滨江区泰安路9号星光中心6层",
                "url": "",
                "checked": false
              },
              {
                "id": 94,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/58.jpg",
                "title": "西贝莜面村",
                "info": "西贝莜面村主打西北菜，以面食为主。他们家特色的莜面由莜麦加工而成，营养成份是其它面粉营养成份的七倍以上，并且膳食纤维含量高，最适合天天喊着减肥的妹子们。朴实的莜面在西贝变幻出了各种不同形态，莜面窝窝、莜面鱼鱼、莜面条条、莜面蒸饺形式多样，口感筋道，吃一口便能感受到天然的麦香味。 <br/> 地址：滨江区江汉路1515号龙湖滨江天街L6-41",
                "url": "",
                "checked": false
              },
              {
                "id": 95,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/63.jpg",
                "title": "小龙坎",
                "info": "小龙坎火锅的大名恐怕不需要多说。要知道，关于小龙坎的日常，几乎就是排队、排队，不停的排队，甚至曾有过排到1000多桌的记录，每开一家分店必定爆满。小龙坎能有如此疯狂的高人气，当然有它的原因：一个全红汤锅有整整四斤牛油，即使吃了1个小时，也不需要加什么水；不加香精香料，吃完火锅身上也不会有味道。<br/> 地址：江汉路1515号龙湖滨江天街L6-39",
                "url": "",
                "checked": false
              },
              {
                "id": 96,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/68.jpg",
                "title": "小厨师",
                "info": "小厨师专做舟山沈家门的小海鲜，以“地道、新鲜、品种多”而出名。老板本身是舟山人，其父亲和舅舅都是当地大型渔船的船老大，因此店里的海鲜全部是从舟山直运到杭州，新鲜肥美、个头大。烹饪时也不使用过多的调料，最大程度地保持海鲜的原汁原味。<br/> 地址：滨江区春晓路61号中赢康康谷6幢106",
                "url": "",
                "checked": false
              },
              {
                "id": 97,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/72.jpg",
                "title": "星贝壳",
                "info": "以纯手工披萨起家的星贝壳早已声名在外，他们家的饼底大约只有1cm，纯手工拍制+现点现做，并且所有步骤都在透明厨房里完成，据称有人排号半小时都愿意等。星贝壳的食材选择也非常讲究，包括意大利托斯卡纳地区的面粉、有着“奶中黄金”之称的马苏里拉芝士、来自西西里岛的番茄酱等。<br/> 地址：滨江区滨盛路3867号宝龙城1楼",
                "url": "",
                "checked": false
              },
              {
                "id": 98,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/79.jpg",
                "title": "小食札记",
                "info": "这是一家位于星耀城的成都小吃店，老板两夫妻都是设计师出身——丈夫是美院毕业的建筑工程师，妻子的专业则是室内设计。他们坚持“匠心”，把身上细致严谨的设计师态度延续到了做美食上面，无论是店内的装修还是食物的制作，都亲力亲为，竭力还原正宗的川味。<br/> 地址：滨江区江陵路2028号星耀城一期2-113号",
                "url": "",
                "checked": false
              },
              {
                "id": 99,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/87.jpg",
                "title": "侠饭",
                "info": "侠饭将海鲜丼饭作为主打料理。鱼类食材来自上海，取当天到港的活鱼，到店新鲜处理后被料理成各式各样的丼饭，我们从中吃到的生鱼片，从宰杀都上桌，不超过48个小时。在侠饭的十几款丼饭中，最招牌的当属惊世综合海鲜丼饭，三文鱼、金枪鱼、鰤（shi，音同“师”）鱼、甜虾......非常有料。<br/> 地址：滨江区江汉路1515号龙湖滨江天街6楼46号",
                "url": "",
                "checked": false
              },
              {
                "id": 100,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/100.jpg",
                "title": "新元素",
                "info": "新元素餐厅崇尚极简主义，从名字到整个店的装饰，无不透露着沁人心扉的感觉，透明玻璃窗更加传递出一种清新感。遵循“新鲜、健康、美味”的原则，每个季节新元素都会精心挑选国内外当季的新鲜食材制作轻食。无论是色拉、果昔、或是主食和各类餐点，都洋溢着新鲜的气息和滋味。<br/> 地址：滨江区江汉路1515号龙湖滨江天街L1-33",
                "url": "",
                "checked": false
              },
              {
                "id": 101,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/105.jpg",
                "title": "亚萃",
                "info": "亚萃作为极受欢迎的新加坡美食，从嘉里中心过江跨桥来到了滨江龙湖天街，成功吸引了无数吃货。正如新加坡的包容并蓄一般，亚萃也包罗万象，来、娘惹、闽南、客家等多种美食派系融汇其中，从菜名到口感，每一处都让人感受到南洋风情，热带地区明媚的阳光和大海的味道触手可及。<br/> 地址：滨江区江汉路1515号龙湖滨江天街L6-06",
                "url": "",
                "checked": false
              },
              {
                "id": 102,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/86.jpg",
                "title": "鱼味馆",
                "info": "主做千岛湖有机鱼、开化清水鱼及各类农家菜。原汁原味的浓汤千岛湖有机鱼锅是招牌，鱼汤鲜美，肉质细嫩，没有土腥味，桌上有电磁炉加热保温，可以像火锅一样加自己喜欢的烫菜。人多还可以点5斤以上的鱼做一鱼两吃，浓汤、家烧、剁椒、酸菜、红烧、火锅鱼等多种吃法自由组合。<br/> 地址：杭州市滨江区东信大道66号",
                "url": "",
                "checked": false
              },
              {
                "id": 103,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/92.jpg",
                "title": "御荣府火锅",
                "info": "想要品味正宗的成都火锅，御荣府火锅是一个非常不错的选择。他们家最出名的当属秘制红油锅，来自宫廷火锅御厨后人的家传秘方，用了贵州虾子镇辣椒、大红袍花椒等数十种天然香辛及中草药，香味浓郁，麻辣过瘾。不管是毛肚、鹅肠，还是嫩牛肉，在红油锅中翻滚过后，都浸润了地道的川蜀风味。<br/> 地址：滨江区江南大道228号星光国际广场1号楼3楼",
                "url": "",
                "checked": false
              },
              {
                "id": 104,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/62.jpg",
                "title": "竹哩",
                "info": "竹哩有着足足2000平方的面积，设置了四十多个包厢，无处不在的竹子元素更给人一种清静雅致的感觉。这是一家无限放题（即自助，先点再上菜，不限量）日料，价格有398元和598元两个选择，菜品由日料师傅和行政总厨经过数次调试和创新而来，在遵循传统日料控制食材新鲜之外，更加符合杭州人的口味。<br/> 地址：滨江区江汉路科技馆街1505凯瑞金座3楼",
                "url": "",
                "checked": false
              },
              {
                "id": 105,
                "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/85.jpg",
                "title": "醉清迈",
                "info": "不同于寻常的泰国菜餐厅，醉清迈我们看不到东南亚热带雨林般的环境、无处不在的神像以及载歌载舞的表演，更多的则是传统和创新的融合，装修时尚感十足。菜品也在保持泰式风味的同时，融合进各式烹饪思路，以招牌咖喱皇炒蟹、清迈菜包鱼为代表的创意泰菜可是圈了不少粉。<br/> 地址：滨江区滨盛路1766号星光大道二期3楼",
                "url": "",
                "checked": false
              }
            ]
          }
        ],
        "otherData": {
          "header": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/header02.jpg",
          "qrcode": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/qrcode02A.png",
          "rule": "<B>活动时间</B>：2017年12月30日——2018年1月11日中午12点 <br/><br/><B>投票规则</B>：<br/>1、每个微信ID在“滨江生活圈”和“滨江发布”两个平台均有投票机会，且票数可以叠加；<br/><br/>2、在同一个平台，每个微信ID每次仅可选择三家餐厅，且对同一家餐厅每天只可投1票，次日可继续投；<br/><br/>3、餐厅展示以首字母顺序排列，点击图片可查看餐厅详细介绍；<br/><br/>4、为了评选活动的公平进行，请勿刷票，一经发现将作废所有票数。",
          "attention": "识别图中二维码进入微信公众号，<br/>点击底部菜单栏中的“人气餐厅评选”按钮即可进入评选界面参与投票！",
          "follow": [],
          "rule_fontsize": "1.4",
          "rule_color": "#824314",
          "cat_icon": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/cat_02.png",
          "cat_bgc": "#f6b51d",
          "body_bgc": "#f9e4d7",
          "button_bgc": "#f6b51d",
          "button_color": "#e2812b",
          "modal_bg": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/modal_bg02.png",
          "modal_color": "#fff",
          "col_num": 2,
          "cat_max_vote": 0,
          "least_vote": [
            "=",
            "3"
          ],
          "link": ""
        },
      };
    },
    computed: {
      isShare() {
        return window.isShare;
      }
    },
    methods: {
      // loadmore
      handleMore() {
        this.loadMore = !this.loadMore;
      },
      // 勾选监听
      checkInput(category, spot) {
        // '' 为已关注，反之，则显示关注页面
        if (window.isShare !== '') {
          this.followDisplay = true;
          spot.checked = false;
        }
        // 当前分类勾选数
        const _checkedList = [];
        category.spots.forEach(({checked, id}) => {
          checked && _checkedList.push(id);
        });
        category.checkedList = _checkedList.slice(0);
        // 显示总勾选数
        let _allChecked = [];
        this.listData.forEach(category => {
          _allChecked = _allChecked.concat(category.checkedList);
        });
        this.allChecked = _allChecked.slice(0);

        const least_vote = +this.otherData.least_vote[1];
        if (least_vote === 0) return;
        switch (this.otherData.least_vote[0]) {
          case '=' :
            if (this.allChecked.length > least_vote) {
              spot.checked = false;
              this.$message(
                '提示',
                `投票数量必须等于${least_vote}个`
              );
              // 当前分类勾选数
              const _checkedList = [];
              category.spots.forEach(({checked, id}) => {
                checked && _checkedList.push(id);
              });
              category.checkedList = _checkedList.slice(0);
              // 显示总勾选数
              let _allChecked = [];
              this.listData.forEach(category => {
                _allChecked = _allChecked.concat(category.checkedList);
              });
              this.allChecked = _allChecked.slice(0);
            }
            break;
          case '<':
            if (this.allChecked.length >= least_vote) {
              spot.checked = false;
              this.$message(
                '提示',
                `投票数量必须小于${least_vote}个`
              );
              // 当前分类勾选数
              const _checkedList = [];
              category.spots.forEach(({checked, id}) => {
                checked && _checkedList.push(id);
              });
              category.checkedList = _checkedList.slice(0);
              // 显示总勾选数
              let _allChecked = [];
              this.listData.forEach(category => {
                _allChecked = _allChecked.concat(category.checkedList);
              });
              this.allChecked = _allChecked.slice(0);
            }
            break;
          case '<=':
            if (this.allChecked.length > least_vote) {
              spot.checked = false;
              this.$message(
                '提示',
                `投票数量必须小于等于${least_vote}个`
              );
              // 当前分类勾选数
              const _checkedList = [];
              category.spots.forEach(({checked, id}) => {
                checked && _checkedList.push(id);
              });
              category.checkedList = _checkedList.slice(0);
              // 显示总勾选数
              let _allChecked = [];
              this.listData.forEach(category => {
                _allChecked = _allChecked.concat(category.checkedList);
              });
              this.allChecked = _allChecked.slice(0);
            }
            break;
        }
      },
      // 显示详情
      handleClick(spot) {
        this.curSpot = spot;
        this.modal = true;
        this.$el.addEventListener('touchmove', _stopPrevent, false);
        this.$nextTick(() => {
          this.scroll.refresh();
          this.scroll.scrollTo(0);
        });
      },
      // 关闭闲情
      handleClose() {
        this.modal = false;
        this.$el.removeEventListener('touchmove', _stopPrevent, false);
      },
      // 关闭关注弹窗
      closeFollow() {
        this.followDisplay = false;
      },
      /**
       * 用时间戳判断是否为当日
       * @param str 接收时间戳
       * @returns {boolean} 返回是否为当日
       */
      isToday(str) {
        return new Date(str).toDateString() === new Date().toDateString();
      },
      // 获取投票列表数据
      async getVoteData() {
        const {status, param, info} = await this.$http.post('voteData', {});
        if (status === 200) {
          this.otherData = param.otherData;
          this.listData = param.listData;
          if (this.listData.length > 0) {
            await this.listData.forEach(item => {
              item.spots.forEach(spot => {
                this.voteList[spot.id] = 0;
              });
            });
          }
          return true;
        } else {
          this.$toast(info);
          return false;
        }
      },
      // 获取票数信息
      async getVoteShow() {
        const {status, param, info} = await this.$http.post('voteShow', {});
        if (status === 200) {
          this.voteList = JSON.parse(param).vote;
        } else {
          this.$toast(info);
        }
      },
      // 提交投票
      async submitVote() {
        for (let i = 0, len = this.listData.length; i < len; i++) {
          if (this.otherData.cat_max_vote !== 0) {
            const category = this.listData[i];
            if (category.checkedList.length < this.otherData.cat_max_vote) {
              this.$message(
                '提示',
                `${category.title}分类下最少勾选${this.otherData.cat_max_vote}个`
              );
              return;
            }
          }
        }
        let isValidated = true;
        // 每人每次须投10票（含10票）以上
        const least_vote = +this.otherData.least_vote[1];
        switch (this.otherData.least_vote[0]) {
          case '>' :
            if (this.allChecked.length <= least_vote) {
              isValidated = false;
              this.$message(
                '提示',
                `投票数量必须大于${least_vote}个`
              );
            }
            break;
          case '>=':
            if (this.allChecked.length < least_vote) {
              isValidated = false;
              this.$message(
                '提示',
                `投票数量必须大于等于${least_vote}个`
              );
            }
            break;
        }
        if (!isValidated) return;
        if (window.sessionStorage.getItem('VOTE_RECORD') !== null && this.isToday(+window.sessionStorage.getItem('VOTE_RECORD'))) {
          this.$message({
            title: '提示',
            message: '今日已经投过票了！',
            confirmButtonText: this.otherData.link === '' ? '确定' : '马上抽奖',
            closeOnClickModal: false,
            showCancelButton: true
          }).then(action => {
            if (action === 'confirm') {
              // redirect
              if (this.otherData.link !== '') {
                window.location.href = this.otherData.link;
              } else {
                this.getVoteShow();
              }
            }
          });
        } else {
          // 正常投票
          const res = await this.$http.post('votePoll', {
            jids: this.allChecked
          });
          if (res.status === 200) {
            this.voteList = JSON.parse(res.param).vote;
            sessionStorage.setItem('VOTE_RECORD', new Date().getTime());
            this.$message({
              title: '提示',
              message: '您已投票成功！',
              confirmButtonText: this.otherData.link === '' ? '确定' : '马上抽奖',
              closeOnClickModal: false,
              showCancelButton: true
            }).then(action => {
              if (action === 'confirm') {
                // redirect
                if (this.otherData.link !== '') {
                  window.location.href = this.otherData.link;
                } else {
                  this.getVoteShow();
                }
              }
            });
          } else {
            this.$toast(res.info);
          }
        }
      },
      async wechatConfig() {
        // 微信配置文件
        const {status, param, info} = await this.$http.post('apiForConfig', {});
        if (status) {
          wx.config(param);
        } else {
          this.$toast(info);
        }
      }
    },
    mounted() {
      this.wechatConfig();
      const load = new Promise(async (resolve, reject) => {
        if (await this.getVoteData()) {
          try {
            document.body.removeChild(document.querySelector('#loading'));
          } catch (e) {}
          resolve();
        } else {
          reject();
        }
      });
      load.then(() => {
        this.getVoteShow();
      });
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {});
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "~scss_vars";

  .wrapper {
    width: 100%;
    height: 100%;
    background: rgb(181, 29, 42);
    font-size: $fontSize;
  }

  .container {
    width: 100%;
    height: auto;
    padding: $padding * 2 $padding 0 $padding;
    box-sizing: border-box;

    &__content {
      padding-bottom: $padding;
      border-radius: $padding;
      background-color: #fff;
    }

    &__footer {
      &__btn {
        display: block;
        width: 16.6rem;
        height: 4rem;
        line-height: 1.5rem;
        margin: $padding auto;
        border-radius: 4px;
        text-align: center;
        font-size: $fontSize;
        font-weight: bold;
        border: 0;
        &--enable {
          background-color: #f6b51d;
          color: #eb4036;
        }
        &--disable {
          background-color: #adabad;
          color: #484848;
        }
      }
    }
  }

  .category {
    width: 100%;
    padding-top: 1rem;
    &__title {
      width: 100%;
      height: 3.2rem;
      margin-top: 1rem;
      /*background-repeat: no-repeat;*/
      /*background-size: cover;*/
      position: relative;
      &__icon {
        position: absolute;
        top: -0.5rem;
        width: 4.5rem;
        height: 4.5rem;
        background-size: cover;
        background-repeat: no-repeat;
      }
      &__text {
        position: absolute;
        left: 5rem;
        top: 1rem;
        font-size: $fontSize;
        color: #fff;
      }
    }
    &__list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      /*justify-content: flex-start;*/
      height: auto;
    }
  }

  .point {
    position: relative;
    flex-basis: 33.33%;
    /*flex-grow: 1;*/
    /*flex-shrink: 1;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    box-sizing: border-box;
    &__img {
      width: 8rem;
      height: 8rem;
      border: 0.5rem solid #cfcfcf;
      border-radius: 50%;
      overflow: hidden;
      /*box-sizing: border-box;*/
      background-color: #cfcfcf;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    &__text {
      /*height: 4rem;*/
      padding: $padding;
      margin-bottom: $padding;
      text-align: center;
      font-size: 14rem / $rem;
      font-weight: bold;
    }
    &__action {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      font-size: 12rem / $rem;
      input {
        margin-right: $padding;
        vertical-align: middle;
      }
    }
  }

  .follow {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;

    &__img {
      display: block;
      width: 70%;
      height: auto;
      z-index: 1010;
    }
    &__text {
      padding: 3 * $padding;
      line-height: 1.5;
      font-size: 18rem / $rem;
      color: #fff;
      z-index: 1010;

      &--focus {
        font-size: 22rem / $rem;
        color: #f00;
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: $padding;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.4);
    z-index: 900;

    .detail {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 35rem;
      height: 23rem;
      padding: 4 * $padding 3 * $padding;
      padding-bottom: 0;
      border-radius: 0.5rem;
      box-sizing: border-box;
      z-index: 1100;

      &__close {
        position: absolute;
        top: -1rem;
        right: -1rem;
        width: 3rem;
        height: 3rem;
        background: url("../assets/images/del-coin.png") no-repeat;
        background-size: cover;
      }

      &__img {
        flex: 10rem 0 0;
        margin-right: $padding;
        text-align: center;

        &__url {
          color: #666;
        }
      }

      &__scroll {
        height: 13rem;
        /*overflow-y: scroll;*/
        overflow: hidden;
      }
      &__text {
        width: 100%;
        height: auto;

        &__title {
          margin-bottom: $padding;
          font-size: $fontSize;
          font-weight: bold;
          text-align: center;
        }
        &__info {
          letter-spacing: 2px;
          font-size: 12rem / $rem;
          text-indent: 2em;
        }
      }
    }
  }

  .vote-count {
    position: fixed;
    right: 0;
    top: 5rem;
    width: 9rem;
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    font-size: 14rem / $rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
  }

  .notice {
    width: 100%;
    margin-bottom: 2 * $padding;
    line-height: 1.5;
    color: #fff;
    font-size: $fontSize;
    text-align: left;
    p {
      text-indent: 2em;
      padding: 0.5rem 0;
    }

    &--hidden {
      max-height: 8em;
      overflow: hidden;
    }
    &--display {
      height: auto;
    }
  }

  .load-more {
    text-align: center;
    &__btn {
      display: block;
      width: 16.6rem;
      height: 3rem;
      line-height: 3rem;
      margin: $padding auto;
      border-radius: 4px;
      text-align: center;
      font-size: $fontSize;
      font-weight: bold;
      border: 0;
      &--enable {
        background-color: #f6b51d;
        color: #eb4036;
      }
      &--disable {
        background-color: #adabad;
        color: #484848;
      }
    }
  }

  .partner {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 3rem;
    background: rgb(237, 244, 138);

    &__item {
      color: #333;
      text-decoration: #333 underline;
      font-size: 14rem / $rem;
    }
  }

  // for PC
  @media screen and (min-width: 640px) {
    .header,
    .container {
      height: 100%;
      margin: 0 auto;
    }
    .header {
      width: 640px;
    }
    .container {
      width: 680px;
    }
  }

  // for iPhone 5
  @media all and (max-width: 320px) {
    .point__img {
      width: 7rem;
      height: 7rem;
      border: 0.3rem solid #cfcfcf;
    }
    .modal .detail {
      background-size: 100% 100%!important;
    }
    .container__footer__btn {
      width: 15rem;
      height: 3rem;
      line-height: 3rem;
    }
  }
</style>
