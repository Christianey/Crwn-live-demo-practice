const { createSelector } = require("reselect");

const directorySelector = state => state.directory;

export const selectSection = createSelector(
    [directorySelector],
    directory => directory.sections
)