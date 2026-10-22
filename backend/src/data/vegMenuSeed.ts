import { MenuItem } from '../types.js';
import { officialMenuItems } from './officialMenu.js';

export const officialVegMenuItems: MenuItem[] = officialMenuItems.filter(item => item.isVeg) as unknown as MenuItem[];
