import { Box, Button, Input } from "@mui/material";
import React from "react";

export default function ImportSave() {
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const input = event.target as HTMLInputElement;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <form encType="multipart/form-data" onChange={(event) => submit(event)}>
        <Button
          variant="outlined"
          color="primary"
          component="label"
          htmlFor="fileimport"
        >
          Import Save
        </Button>
        <Input type="file" id="fileimport" style={{ display: "none" }} />
      </form>
    </Box>
  );
}
