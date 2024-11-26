import { Box, MenuItem } from "@mui/material";
import { Select } from "antd";
import React from "react";
import { SearchBarDefault } from ".";

const FilterPane = ({ selectedAction, menuActions, setSelectedAction, searchText, setSearchText, search, placeholder }) => {
    return(
        <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={"0.4em"}
            sx={{ width: "100%" }}
        >
            <Select
                sx={{ width: "20%" }}
                value={selectedAction}
                size="small"
                onChange={(event) => setSelectedAction(event.target.value)}
            >
                {
                    menuActions.map((action, index) => (
                        <MenuItem value={action.value}>{action.label}</MenuItem>
                    ))
                }
            </Select>
            <SearchBarDefault
                sx={{ width: "80%" }}
                value={searchText}
                setValue={setSearchText}
                placeholder={placeholder}
                search={search}
            ></SearchBarDefault>
        </Box>
    );
}

export default FilterPane;