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
  console.log(avatar, "Avatar");
  return (
    <div
      className="relative"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <Image
        fill
        className="rounded-full object-cover"
        src={avatar ? avatar : defaultAvatar}
        alt="Avatar"
      />
    </div>
  );
};
