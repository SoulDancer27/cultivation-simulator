import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  CountableItems,
  InventoryUniqueItem,
  UniqueItems,
} from "GameConstants/Interfaces";
import { PlayerContext } from "GameEngine";
import React from "react";

// Options for the realm selection menu
const Realms: Realm[] = [
  {
    label: "Mortal",
    index: 8,
  },
  {
    label: "Body Ref.",
    index: 17,
  },
  {
    label: "Qi Gath.",
    index: 26,
  },
];

// Options for the type selector menu
const ItemTypes: Array<string> = UniqueItems.map((x) => x);
ItemTypes.unshift("all");

export default function AutosellPanel() {
  const { inventory, updateContext } = React.useContext(PlayerContext);
  // Type field manager
  const [type, setType] = React.useState<string>(ItemTypes[0]);
  const typeSelectChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  // Realm field manager
  const [realm, setRealm] = React.useState<Realm>(Realms[0]);
  const realmSelectChange = (event: SelectChangeEvent) => {
    const realm_index = parseInt(event.target.value);
    const newRealm = Realms.find((item) => item.index === realm_index);
    if (!newRealm) return;
    setRealm(newRealm);
  };

  // Quality field manager
  const [quality, setQuality] = React.useState<number>(1);
  const qualityFieldChange = (event) => {
    const q = parseInt(event.target.value);
    if (isNaN(q)) return;
    setQuality(q);
  };
  // Autosell checkbox manager
  const [isActive, setActive] = React.useState<boolean>(false);

  // Run Autosell
  React.useEffect(() => {
    const autosellInterval = setInterval(() => {
      if (!isActive) return;
      const newInventory = inventory.filter((item) => {
        if (CountableItems.includes(item.type as any)) return true; // autosell does not sell countable items
        // For InventoryUniqueItems
        const uItem = item as InventoryUniqueItem;
        if (uItem.isEquipped || uItem.isLocked) return true; // equipped and locked items are not sold
        const itemType = uItem.type;
        const itemRealm = uItem.item.realmIndex;
        const itemQuality = uItem.item.quality;
        if (type !== "all" && itemType !== type) return true; // types does not match
        if (type === "all" || itemType === type) {
          if (itemRealm <= realm.index && itemQuality <= quality) return false; // sell item
        }
        return true;
      });
      updateContext({ inventory: newInventory.slice() });
    }, 1000);
    return () => {
      clearInterval(autosellInterval);
    };
  }, [type, realm, quality, isActive]);
  return (
    <Box
      marginTop={2}
      display="flex"
      gap={2}
      alignItems={"center"}
      flexWrap={"wrap"}
    >
      <Box>
        <FormControl>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Type"
            onChange={typeSelectChange}
          >
            {ItemTypes.map((type) => (
              <MenuItem value={type} key={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <InputLabel id="realm-label">Realm</InputLabel>
          <Select
            labelId="realm-label"
            value={realm.index.toString()}
            label="Realm"
            onChange={realmSelectChange}
          >
            {Realms.map((realm) => (
              <MenuItem value={realm.index} key={realm.index}>
                {realm.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box maxWidth={120}>
        <TextField
          id="quality"
          label="Quality"
          variant="outlined"
          onChange={qualityFieldChange}
          value={quality}
        />
      </Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={isActive} onClick={() => setActive(!isActive)} />
          }
          label="Autosell"
        />
      </FormGroup>
    </Box>
  );
}

type Realm = { label: string; index: number };
