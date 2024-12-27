import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    theme: {
    extend: {
      colors: {
        'shack-gray': '#353238',
        'shack-text': '#C1B4AE',
        'shack-red': '#92140C',
        'shack-orange': '#BE7C4D',
        'shack-bright-orange': '#BE5A38',
      }
    }
  }
}
