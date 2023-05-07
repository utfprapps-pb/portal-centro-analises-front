export type DependencesHookProps<T> = {
  getDependences: () => Promise<T>
}
