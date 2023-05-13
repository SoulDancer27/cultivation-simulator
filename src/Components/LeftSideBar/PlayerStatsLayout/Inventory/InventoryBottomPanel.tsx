import { Box, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { InventoryPages } from "../Inventory";

type Props = {
  pages: InventoryPages;
  setPages: React.Dispatch<React.SetStateAction<InventoryPages>>;
};

// A panel below the inventory, that allows switching inventory pages
export default function InventoryBottomPanel(props: Props) {
  const { pages, setPages } = props;
  return (
    <Box width={512} height={24}>
      <Button
        onClick={() =>
          setPages((pages) => ({ current: 1, total: pages.total }))
        }
        disabled={pages.current === 1}
        sx={{ maxWidth: 24, minWidth: 24 }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() =>
          setPages((pages) => ({
            current: pages.current - 1,
            total: pages.total,
          }))
        }
        disabled={pages.current === 1}
        sx={{ maxWidth: 24, minWidth: 24 }}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <Button
        onClick={() =>
          setPages((pages) => ({
            current: pages.current + 1,
            total: pages.total,
          }))
        }
        disabled={pages.current === pages.total}
        sx={{ maxWidth: 24, minWidth: 24 }}
      >
        <KeyboardArrowRightIcon />
      </Button>
      <Button
        onClick={() =>
          setPages((pages) => ({ current: pages.total, total: pages.total }))
        }
        disabled={pages.current === pages.total}
        sx={{ maxWidth: 24, minWidth: 24 }}
      >
        <KeyboardDoubleArrowRightIcon />
      </Button>
    </Box>
  );
}
