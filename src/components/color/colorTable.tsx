"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import {Box, IconButton} from "@mui/material";
import {MaterialReactTable, MRT_ColumnDef} from "material-react-table";
import {useCallback, useMemo} from "react";
import {useAtom} from "jotai";
import {colorsState} from "@/state/colorsState";
import {RandomColor} from "@/models/randomColor";

export const ColorTable: React.FC = () => {
    const [colorList, setColorList] = useAtom(colorsState);

    const onRemoveColor = useCallback(
        (hex: string) => {
            setColorList((prev) => prev.filter((c) => c.hex !== hex));
        },
        [setColorList]
    );

    const columns = useMemo<MRT_ColumnDef<RandomColor>[]>(
        () => [
            {
                id: "color",
                accessorKey: "hex",
                header: "Color",
                size: 150,
                Cell: ({cell}) => (
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
                Cell: ({cell}) => (
                    <IconButton
                        key={cell.getValue<string>()}
                        onClick={() => onRemoveColor(cell.getValue<string>())}
                    >
                        <DeleteIcon/>
                    </IconButton>
                ),
            },
        ],
        [onRemoveColor]
    );

    return <MaterialReactTable columns={columns} data={colorList}/>;
};
