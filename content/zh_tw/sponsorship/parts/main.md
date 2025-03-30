<script setup lang="ts">
import TitaniumPart from './titanium.md'
import DiamondPart from './diamond.md'
import GoldPart from './gold.md'
import SliverPart from './sliver.md'
import BronzePart from './bronze.md'
import FriendPart from './friend.md'
import OverseaPart from './oversea.md'
</script>

|              | ![](/@/assets/images/sponsorships/levels/titanium.webp) 鈦金級 | ![](/@/assets/images/sponsorships/levels/diamond.webp) 鑽石級 | ![](/@/assets/images/sponsorships/levels/gold.webp) 黃金級 |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| **贊助金額** | **238,000**                                                    | **170,500**                                                   | **137,500**                                                |
| **贊助福利** | <TitaniumPart />                                               | <DiamondPart />                                               | <GoldPart />                                               |

|              | ![](/@/assets/images/sponsorships/levels/sliver.webp) 白銀級 | ![](/@/assets/images/sponsorships/levels/bronze.webp) 青銅級 | ![](/@/assets/images/sponsorships/levels/friend.webp) 好朋友級 |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------- |
| **贊助金額** | **82,500**                                                   | **38,500**                                                   | **22,000**                                                     |
| **贊助福利** | <SliverPart />                                               | <BronzePart />                                               | <FriendPart />                                                 |

|              | ![](/@/assets/images/sponsorships/levels/oversea.webp) 贊助社群客製化方案 |
| ------------ | ------------------------------------------------------------------------- |
| **贊助方式** | **以好朋友或以上方案（含加購項目）贊助**                                  |
| **贊助福利** | <OverseaPart />                                                           |

<style scoped>
table {
  th {
    text-align: center;
    > img {
      margin: 0 auto;
      width: 80px;
      height: 80px;
    }

  }

  tr {
    td {
      :deep(p) {
        margin: 6px 0;
      }
      :deep(ul) {
        margin: 0;
      }
      :deep(ul>li) {
        margin-top: 0;
      }
    }

    td:first-child {
      width: 10%;
    }

    td:nth-child(n+2) {
      width: 30%;
    }
  }
}

table:nth-child(n+3) {
  tr {
    td:first-child {
      width: 10%;
    }
    td:nth-child(n+2) {
      width: 90%;
    }
  }
}
</style>
