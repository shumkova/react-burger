export const TAB_SWITCH: 'TAB_SWITCH' = 'TAB_SWITCH';

interface ITabSwitchAction {
  readonly type: typeof TAB_SWITCH;
  readonly tab: string;
}

export type TMenuActions = ITabSwitchAction;

export const tabSwitchAction = (tab: string): ITabSwitchAction => ({
  type: TAB_SWITCH,
  tab
})
