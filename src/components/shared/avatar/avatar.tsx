import defaultAvatar from "@/assets/svgs/default-avatar.svg";
import Image from "next/image";

export const Avatar = ({
  avatar,
  height = 50,
  width = 50,
}: {
  avatar?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <img
      style={{ height: `${height}px`, width: `${width}px` }}
      className="rounded-full object-cover"
      src={avatar ? avatar : defaultAvatar}
      alt="Avatar"
    />
  );
};
