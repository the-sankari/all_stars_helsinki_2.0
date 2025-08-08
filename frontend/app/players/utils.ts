export const getPositionColor = (position: string) => {
  switch (position) {
    case "GK":
      return "bg-yellow-500";
    case "DEF":
      return "bg-blue-500";
    case "MID":
      return "bg-green-500";
    case "ST":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getPositionFullName = (position: string) => {
  switch (position) {
    case "GK":
      return "Goalkeeper";
    case "DEF":
      return "Defender";
    case "MID":
      return "Midfielder";
    case "ST":
      return "Striker";
    default:
      return position;
  }
};
