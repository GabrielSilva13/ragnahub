import { Html, useProgress } from '@react-three/drei'

export const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html>
      <span className="canvas-loader"></span>
      <p className="mt-10 text-sm font-extrabold text-[#f1f1f1]">
        {progress.toFixed(2)}%
      </p>
    </Html>
  )
}
