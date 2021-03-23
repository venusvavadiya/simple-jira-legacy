interface ProjectCreatedV1 {
  projectId: string
}

function newEvent<Event>(data: Event) {
  return { data };
}

export const ProjectAggregate = {
  create(state, id) {
    return newEvent<ProjectCreatedV1>({ projectId: id });
  },

  rename(state, name) {
    return {
      type: 'ProjectRenamedV1',
      data: { projectId: state.id, name },
    };
  },
};

export const ProjectProjection = {

};
