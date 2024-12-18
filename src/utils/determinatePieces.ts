interface PropsDeterminate {
  totalPieces: any;
  totalPiecesInSize: number;
  totalPiecesInName: number;
  totalPiecesInLong: number;
  stateShow: any;
  totalPiecesInInitial: number;
}
export const determineTotalPieces = ({
  totalPieces,
  totalPiecesInSize,
  stateShow,
  totalPiecesInName,
  totalPiecesInInitial,
  totalPiecesInLong,
}: PropsDeterminate) => {
  if (
    !stateShow.size &&
    !stateShow.long &&
    !stateShow.initialName &&
    stateShow.name
  ) {
    return totalPiecesInName.toString();
  }
  if (
    !stateShow.size &&
    !stateShow.long &&
    stateShow.initialName &&
    !stateShow.name
  ) {
    return totalPiecesInInitial.toString();
  }
  if (
    !stateShow.size &&
    stateShow.long &&
    !stateShow.initialName &&
    !stateShow.name
  ) {
    return totalPiecesInLong.toString();
  }
  if (
    stateShow.size &&
    !stateShow.long &&
    !stateShow.initialName &&
    !stateShow.name
  ) {
    return totalPiecesInSize.toString();
  }
  if (
    stateShow.size &&
    stateShow.long &&
    stateShow.initialName &&
    stateShow.name
  ) {
    return totalPieces.toString();
  }
};
