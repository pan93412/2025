<script setup lang="ts">
import TitaniumPart from './titanium.md'
import DiamondPart from './diamond.md'
import GoldPart from './gold.md'
import SliverPart from './sliver.md'
import BronzePart from './bronze.md'
import FriendPart from './friend.md'
import OverseaPart from './oversea.md'
</script>

|              | ![](/@/assets/images/sponsorships/levels/titanium.webp) Titanium | ![](/@/assets/images/sponsorships/levels/diamond.webp) Diamond | ![](/@/assets/images/sponsorships/levels/gold.webp) Gold |
| ------------ | ---------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| **Cost**     | **8,500**                                                        | **6,090**                                                      | **4,910**                                                |
| **Benefits** | <TitaniumPart />                                                 | <DiamondPart />                                                | <GoldPart />                                             |

|              | ![](/@/assets/images/sponsorships/levels/sliver.webp) Silver | ![](/@/assets/images/sponsorships/levels/bronze.webp) Bronze | ![](/@/assets/images/sponsorships/levels/friend.webp) Friend |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Cost**     | **2,945**                                                    | **1,375**                                                    | **785**                                                      |
| **Benefits** | <SliverPart />                                               | <BronzePart />                                               | <FriendPart />                                               |

|              | ![](/@/assets/images/sponsorships/levels/oversea.webp) Customized Community Sponsorship Program |
| ------------ | ----------------------------------------------------------------------------------------------- |
| **Methods**  | **The 'Friend' package or higher (including add-on options)**                                   |
| **Benefits** | <OverseaPart />                                                                                 |

<style scoped lang="css">
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
      vertical-align: top;

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
