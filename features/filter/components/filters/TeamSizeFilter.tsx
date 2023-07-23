import { FormControl, FormLabel, Slider } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../stores/store";
import filtersSlice from "../../stores/filters.slice";

export const TeamSizeFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const teamSize = useSelector((state: RootState) => state.filters.teamSize);

  return (
    <FormControl>
      <FormLabel id="filters-team-size">Team Size</FormLabel>
      <Slider
        aria-labelledby="filters-team-size"
        marks={[
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: 3,
            value: 3,
          },
          {
            label: 4,
            value: 4,
          },
          {
            label: 5,
            value: 5,
          },
        ]}
        min={1}
        max={5}
        defaultValue={teamSize}
        onChangeCommitted={(_, value) =>
          dispatch(
            filtersSlice.actions.updateTeamSize(
              Array.isArray(value) ? value[0] : value,
            ),
          )
        }
      />
    </FormControl>
  );
};
