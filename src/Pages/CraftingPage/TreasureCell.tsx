import { BasicGridCell } from "Components";
import { Activity } from "GameConstants/Activities";
import findItemDescription from "GameConstants/utils/findItemDescription";

type Props = {
  width: number;
  height: number;
  item: Activity;
};

export default function TreasureCell(props: Props) {
  const { width, height, item } = props;
  const reward = item.result.items!;
  const { name, type } = reward[0];

  return <BasicGridCell width={width} height={height} item={{ name, type }} />;
}
