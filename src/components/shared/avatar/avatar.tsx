import defaultAvatar from "@/assets/svgs/default-avatar.svg";
import Image from "next/image";

export const Avatar = ({
  avatar,
  height = 50,
  width = 50,
  hasBorder,
}: {
  avatar?: string;
  height?: number;
  width?: number;
  hasBorder?: boolean;
}) => {
  return (
    <div
      className="relative"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <Image
        fill
        className={`rounded-full object-cover ${
          hasBorder && "border border-[#004DEF]"
        } `}
        src={avatar ? avatar : defaultAvatar}
        alt="Avatar"
      />
    </div>
  );
};
