<template>
  <div class="home">
    <!-- TODO 这里可以换成图片, 效果更好 -->
    <div class="title">幸运大抽奖</div>
    <div class="wrapper">
      <div class="prize" v-for="(item, idx) in list" :key="item.name" :class="{active: current === idx, drawn: item.isDrawn}">
        <span v-if="item.picture" class="image" :style="`background-image: url(${item.picture})`">{{idx}}-{{item.name}}</span>
        <span @click="onStartPlay" class="play-button" v-else>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Util from '@/common/util.ts'

interface Prize {
  name: string; // 奖品名称
  picture: string; // 奖品照片
  isDrawn: boolean; // 奖品是否已经被抽中
}

@Component({})
class Home extends Vue {
  prizes: Array<Prize> = [
    {
      name: '书签',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    },
    {
      name: '笔记本',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    },
    {
      name: '解压笔',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    },
    {
      name: '福袋',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    },
    {
      name: '棒棒糖',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    },
    {
      name: '便利贴',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    },
    {
      name: '小日历',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    },
    {
      name: '再接再厉',
      picture: require('./assets/1.jpg'),
      isDrawn: false
    }
  ];

  list: Array<Prize> = [];

  isDrawing = false;

  current = -1;

  result = -1;

  playSequence: Array<number> = [0, 1, 2, 5, 8, 7, 6, 3];
  order: Array<number> = [0, 1, 2, 5, 8, 7, 6, 3];

  timer = 0;

  a = 10;
  s = 0;

  round = 3;

  mounted () {
    this.list = Util.shuffle(this.prizes)
    this.list.splice(4, 0, { name: '开始', picture: '', isDrawn: true })
  }

  shufflePrizeList () {
    this.prizes = Util.shuffle(this.prizes)
  }

  onStartPlay () {
    const maxValue = this.playSequence.length - 1
    this.result = Util.randomNum(0, maxValue)
    this.s = this.round * this.playSequence.length + this.result
    const steps = 0

    console.log('value:', this.result, this.playSequence[this.result])
    this.current = this.playSequence[0]
    const i = 1
    this.setNextStep(i, steps)
  }

  setNextStep (i: number, steps: number) {
    setTimeout(() => {
      this.current = this.playSequence[i]
      i++
      i %= this.playSequence.length
      steps++
      console.log(steps)
      if (steps === this.s) {
        const prizeNumber = this.playSequence[this.result]
        console.log(this.result, this.playSequence, prizeNumber)
        this.list[prizeNumber].isDrawn = true
        this.playSequence.splice(this.result, 1)
      }
      if (steps < this.s) this.setNextStep(i, steps)
    }, 100 + steps * this.a)
  }
}

export default Home
</script>

<style lang="less" scoped>
.home {
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    padding: 20px 0;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 450px;
    height: 450px;
    margin: 0 auto;
    .prize, .play-button, .image {
      width: 150px;
      height: 150px;
    }

    .image {
      display: flex;
      background: url('./assets/1.jpg') no-repeat;
      background-size: cover;
    }
    .active {
      box-shadow: 0 0 0 4px yellow;
      z-index: 1;
    }
    .drawn {
      opacity: 0.5;
    }
    .play-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #FF0000;
      }
    }
  }
}
</style>
