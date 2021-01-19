import { Theme } from '@material-ui/core/styles';

// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export type DefaultTheme = Theme;
};
