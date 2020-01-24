import * as React from 'react';
import styles from '../AppCustomizer.module.scss';
import { ITenantGlobalNavBarProps } from './ITenantGlobalNavBarProps';
import { ITenantGlobalNavBarState } from './ITenantGlobalNavBarState';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

import * as SPTermStore from './../services/SPTermStoreService'; 

export default class TenantGlobalNavBar extends React.Component<ITenantGlobalNavBarProps, ITenantGlobalNavBarState> {

   /**
   * Main constructor for the component
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  private projectMenuItem(menuItem: SPTermStore.ISPTermObject, itemType: ContextualMenuItemType) : IContextualMenuItem {
      return({
        key: menuItem.identity,
        name: menuItem.name,
        itemType: itemType,
        iconProps:{ iconName: (menuItem.localCustomProperties.iconName != undefined ? menuItem.localCustomProperties.iconName : null)},
        href: menuItem.terms.length == 0 ?
            (menuItem.localCustomProperties["_Sys_Nav_SimpleLinkUrl"] != undefined ?
                menuItem.localCustomProperties["_Sys_Nav_SimpleLinkUrl"]
                : null)
            : null,
        subMenuProps: menuItem.terms.length > 0 ? 
            { items : menuItem.terms.map((i) => { return(this.projectMenuItem(i, ContextualMenuItemType.Normal)); }) } 
            : null,
        isSubMenu: itemType != ContextualMenuItemType.Header,
      });
  }

  public render(): React.ReactElement<ITenantGlobalNavBarProps> {

    let commandBarItems: IContextualMenuItem[] = this.props.menuItems.map((i) => {
        return(this.projectMenuItem(i, ContextualMenuItemType.Header));
    });
    console.log(commandBarItems);
    console.log("All gud");
    const items: IContextualMenuItem[] = [{
      key: 'newItem',
      iconProps: {
        iconName: 'Add'
      },
      text: 'New'
    },
    {
      key: 'upload',
      onClick: () => {
        this.setState({ showCallout: true });
      },
      iconProps: {
        iconName: 'Upload',
        style: {
          color: 'salmon'
        }
      },
      text: 'Upload (Click for popup)',
      title: 'Upload a file'
    },
    {
      key: 'divider_1',
      itemType: ContextualMenuItemType.Divider
    },
    {
      key: 'share',
      iconProps: {
        iconName: 'Share'
      },
      text: 'Share'
    },
    {
      key: 'print',
      iconProps: {
        iconName: 'Print'
      },
      text: 'Print'
    },
    {
      key: 'music',
      iconProps: {
        iconName: 'MusicInCollectionFill'
      },
      text: 'Music'
    }];
    
    commandBarItems.push(...items);
    //commandBarItems.concat(items);
    console.log(commandBarItems);
    return (
      <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.app}`}>
        <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.top}`}>
            <CommandBar
            className={styles.commandBar}
            // isSearchBoxVisible={ false }
            // elipisisAriaLabel='More options'
            items={ commandBarItems }
            />
        </div>
      </div>
    );
  }
}
