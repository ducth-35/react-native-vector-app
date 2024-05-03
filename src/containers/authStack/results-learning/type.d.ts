interface ResultsLearningParams {
  eventId: number;
  content: string;
  numberOfTaskComplete: number;
  numberOfTaskWrong: number;
  numberOfTaskNotComplete: number;
  testMark: number;
  learningSpirit: number;
  learningSpiritNote: string;
  learningAbility: number;
  learningAbilityNote: string;
  assignments?: string;
}

interface ResultLearningRoute {
  id?: number
}