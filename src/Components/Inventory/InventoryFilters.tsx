import { Box, Button } from "@mui/material";
import { InventoryFilters } from "Components/Inventory";

type Props = {
  type: InventoryFilters;
  setType: React.Dispatch<React.SetStateAction<InventoryFilters>>;
};

export default function InventoryFiltersPane(props: Props) {
  const { type, setType } = props;
  return (
    <Box width={128} height={512 - 128}>
      <Button
        variant="outlined"
        onClick={() => setType("all")}
        color={type === "all" ? "success" : "primary"}
        fullWidth
      >
        all
      </Button>
      <Button
        variant="outlined"
        onClick={() => setType("money")}
        color={type === "money" ? "success" : "primary"}
        fullWidth
      >
        money
      </Button>
      <Button
        variant="outlined"
        onClick={() => setType("treasure")}
        color={type === "treasure" ? "success" : "primary"}
        fullWidth
      >
        treasures
      </Button>
    </Box>
  );
}
