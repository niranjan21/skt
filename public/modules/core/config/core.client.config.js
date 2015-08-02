'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
    
      Menus.addMenuItem('topbar', 'Accessories', 'accessories', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'accessories', 'Inward Entries', 'inward-entries');
      
      Menus.addSubMenuItem('topbar', 'accessories', 'Item Master', 'item-masters');
      
      Menus.addSubMenuItem('topbar', 'accessories', 'Outward Entries', 'outward-entries');
      
    
      Menus.addMenuItem('topbar', 'Entry', 'entry', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Delivery Entries', 'delivery-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Job Card', 'job-cards');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Expenses Entry', 'expense-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Fabric Requirement Inward Entry', 'fabric-requirement-inward-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Fabric Return Entry', 'fabric-return-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Invoice', 'invoices');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Payment Entry', 'payment-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Power Consumption Entry', 'power-consumption-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Salary And Wages Entry', 'salary-and-wages-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Stoppages Entry', 'stoppages-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Yarn Receipt Entry', 'yarn-receipt-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Yarn Return Entry', 'yarn-return-entries');
      
    
      Menus.addMenuItem('topbar', 'Fabric Stock', 'fabricstock', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'fabricstock', 'Fabric Item Master', 'fabric-item-masters');
      
      Menus.addSubMenuItem('topbar', 'fabricstock', 'Fabric Sales', 'fabric-sales');
      
      Menus.addSubMenuItem('topbar', 'fabricstock', 'Fabric Sales Register', 'fabric-sale-registers');
      
      Menus.addSubMenuItem('topbar', 'fabricstock', 'Fabric Stock Report', 'fabric-stock-reports');
      
      Menus.addSubMenuItem('topbar', 'fabricstock', 'Fabric Transfer', 'fabric-transfers');
      
      Menus.addSubMenuItem('topbar', 'fabricstock', 'Fabric Transfer Register', 'fabric-transfer-registers');
      
    
      Menus.addMenuItem('topbar', 'General Items', 'generalitems', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'generalitems', 'Direct Inward Entry', 'direct-inward-entries');
      
    
	}
]);
