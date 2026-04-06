import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

/** Native flat config from eslint-config-next (avoids FlatCompat + ESLint 9 circular JSON bug). */
const config = [...require("eslint-config-next/core-web-vitals")]
export default config
