import { Viewer } from "@toast-ui/react-editor";
import { useTheme } from "@/components/theme-provider";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

type CustomViewerProps = {
  contents: string;
};

export default function CustomViewer({ contents }: CustomViewerProps) {
  const { theme } = useTheme();
  return (
    // 테마 적용하려면 key로 지정해야 함
    <Viewer key={theme} initialValue={contents || ""} theme={theme === "dark" ? "dark" : "light"} />
  );
}
