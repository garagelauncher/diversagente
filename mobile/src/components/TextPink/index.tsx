import { Text } from "react-native"

type TextPinkProps = {
  children: string;
}

export const TextPink = ({
  children
}: TextPinkProps) => {
  return <Text
    style={{
      color: "#ff00ff"
    }}
  >{children}</Text>
}
