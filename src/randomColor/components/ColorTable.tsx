import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { RandomColor } from "../model/RandomColor";
import { colorsState } from "../state/colorsState";

interface ColorListProps {}

export const ColorTable: React.FC<ColorListProps> = ({}) => {
  const [colorList, setColorList] = useRecoilState(colorsState);

  const onRemoveColor = (hex: string) => () => {
    console.log(colorList.filter((c) => c.hex !== hex));
    setColorList(colorList.filter((c) => c.hex !== hex));
  };

  const columns = useMemo<MRT_ColumnDef<RandomColor>[]>(
    () => [
      {
        id: "color",
        accessorKey: "hex",
        header: "Color",
        size: 150,
        Cell: ({ cell }) => (
          <Box
            key={cell.getValue<string>()}
            sx={{
              backgroundColor: cell.getValue<string>(),
              borderRadius: 2,
              width: 30,
              height: 30,
            }}
          />
        ),
      },

      {
        id: "hexAsString",
        accessorKey: "hex",
        header: "HEX",
        size: 150,
      },

      {
        id: "remove",
        accessorKey: "hex",
        header: "Remove",
        size: 50,
        Cell: ({ cell }) => (
          <IconButton
            key={cell.getValue<string>()}
            onClick={onRemoveColor(cell.getValue<string>())}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    [colorList]
  );

  return <MaterialReactTable columns={columns} data={colorList} />;
};
