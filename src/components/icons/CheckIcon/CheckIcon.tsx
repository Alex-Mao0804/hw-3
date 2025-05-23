import Icon from "@/components/icons/Icon";
import { IconProps } from "@/components/icons/Icon/Icon";

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path
        d="M4 11.6129L9.87755 18L20 7"
        strokeWidth={props.strokeWidth || 2}
        stroke="currentColor"
      />
    </Icon>
  );
};

export default CheckIcon;
