<template>
  <Modal v-model="modal" title="标准代码版本管理" width="800px">
    <div class="version-diff">
      <div class="version-diff__timeline">
        <Timeline>
          <TimelineItem v-for="item in data" :key="item.version">
            <div class="diff-item">
              <div class="diff-item__header">
                <span class="diff-item__header-id">{{ item.version }}</span>
                <span class="diff-item__header-action">
                  <Tooltip content="添加到左侧对比">
                    <Icon type="ios-arrow-back" @click="left = item" />
                  </Tooltip>
                  <Tooltip content="添加到右侧对比">
                    <Icon type="ios-arrow-forward" @click="right = item" />
                  </Tooltip>
                </span>
              </div>
              <div class="diff-item__date">日期：{{ item.date }}</div>
            </div>
          </TimelineItem>
        </Timeline>
      </div>

      <div class="version-diff__content">
        <div class="content-info">
          <span>版本对比（数据不同，右侧以红色字体标注）</span>
        </div>
        <div class="content-table">
          <!-- 表头 -->
          <div class="content-table__row">
            <div class="content-table__row-cell">
              <Checkbox v-model="hideSameOption">隐藏相同项</Checkbox>
            </div>
            <div class="content-table__row-cell" style="text-align: left">
              <div v-if="!left">左侧基准版本</div>
              <div v-else>
                <div>版本：{{ left.version }}</div>
                <div>日期：{{ left.date }}</div>
              </div>
            </div>
            <div class="content-table__row-cell" style="text-align: left">
              <div v-if="!right">右侧变化版本</div>
              <div v-else>
                <div>版本：{{ right.version }}</div>
                <div>日期：{{ right.date }}</div>
              </div>
            </div>
          </div>

          <!-- 详情 -->
          <div v-for="row in maxRow" :key="row" class="content-table__row">
            <div
              v-for="col in 3"
              :key="col"
              class="content-table__row-cell"
              :class="[
                // `col-${col}`,
                {
                  diff:
                    col === 3 &&
                    dataSource[row - 1].length === 3 &&
                    dataSource[row - 1][1] !== dataSource[row - 1][2],
                },
              ]"
            >
              {{ dataSource[row - 1]?.[col - 1] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "Demo",
  data() {
    return {
      modal: false,
      hideSameOption: false,
      left: null,
      right: null,
      data: [
        {
          version: 1234,
          date: "2024-01-10 12:00:00",
          a: 1,
          b: 2,
          c: 3,
        },
        {
          version: 1235,
          date: "2024-01-11 12:00:00",
          a: 1,
          b: 3,
          c: 3,
        },
        {
          version: 1236,
          date: "2024-01-12 12:00:00",
          a: 2,
          b: 3,
          c: 4,
        },
      ],
    };
  },
  computed: {
    maxRow() {
      return this.dataSource.length;
    },
    dataSource() {
      if (!this.left && !this.right) return [];
      const leftArr = Object.entries(this.left || []);
      const rightArr = Object.entries(this.right || []);

      if (leftArr.length && rightArr.length) {
        const data = leftArr.map((v, i) => [...v, rightArr[i][1]]);
        return this.hideSameOption ? data.filter((v) => v[1] !== v[2]) : data;
      } else {
        return (leftArr.length && leftArr) || (rightArr.length && rightArr);
      }
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep {
  .version-diff {
    display: flex;
    gap: 10px;
    &__timeline {
      width: 200px;
      .diff-item {
        padding: 5px;
        background-color: #eee;
        &__header {
          display: flex;
          justify-content: space-between;
          &-id {
            padding: 0 10px;
            text-align: center;
            background-color: #bdd68e;
            border-radius: 3px;
          }
          &-action {
            display: flex;
            gap: 5px;
          }
        }
      }
    }
    &__content {
      flex: 1;
      .content-info {
        padding: 3px 0;
        background-color: #ccc;
      }
      .content-table {
        border-left: 1px solid #000;
        border-bottom: 1px solid #000;
        width: 100%;
        &__row {
          display: flex;
          width: 100%;
          &-cell {
            flex: 1;
            display: table-cell;
            padding: 5px;
            text-align: center;
            vertical-align: middle;
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            &.diff {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>
