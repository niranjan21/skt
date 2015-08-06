'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
    
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
      
      Menus.addSubMenuItem('topbar', 'entry', 'Fabric Sales', 'fabric-sales');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Fabric Transfer', 'fabric-transfers');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Bulk Needle Change Entry', 'bulk-needle-change-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Needles Breakage', 'needles-breakages');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Inward Entry', 'inward-entries');
      
      Menus.addSubMenuItem('topbar', 'entry', 'Outward Entry', 'outward-entries');
      
    
      Menus.addMenuItem('topbar', 'General Items', 'generalitems', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'generalitems', 'Direct Inward Entry', 'direct-inward-entries');
      
      Menus.addSubMenuItem('topbar', 'generalitems', 'Direct Outward Entry', 'direct-outward-entries');
      
      Menus.addSubMenuItem('topbar', 'generalitems', 'General Item Inward Entry', 'general-item-inward-entries');
      
      Menus.addSubMenuItem('topbar', 'generalitems', 'General Item Outward Entry', 'general-item-outward-entries');
      
      Menus.addSubMenuItem('topbar', 'generalitems', 'General Test Report', 'general-test-reports');
      
      Menus.addSubMenuItem('topbar', 'generalitems', 'Invoice Entry', 'invoice-entries');
      
    
      Menus.addMenuItem('topbar', 'Master', 'master', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'master', 'Collar Size', 'collar-sizes');
      
      Menus.addSubMenuItem('topbar', 'master', 'Concern', 'concerns');
      
      Menus.addSubMenuItem('topbar', 'master', 'Count Master', 'count-masters');
      
      Menus.addSubMenuItem('topbar', 'master', 'Dia List', 'dia-lists');
      
      Menus.addSubMenuItem('topbar', 'master', 'Employee Master', 'employee-masters');
      
      Menus.addSubMenuItem('topbar', 'master', 'Expenses', 'expenses');
      
      Menus.addSubMenuItem('topbar', 'master', 'Fabric Description', 'fabric-descriptions');
      
      Menus.addSubMenuItem('topbar', 'master', 'Fabric Group', 'fabric-groups');
      
      Menus.addSubMenuItem('topbar', 'master', 'Fixed Rate', 'fixed-rates');
      
      Menus.addSubMenuItem('topbar', 'master', 'Leave Master', 'leave-masters');
      
      Menus.addSubMenuItem('topbar', 'master', 'Machine Knitting', 'machine-knittings');
      
      Menus.addSubMenuItem('topbar', 'master', 'Marketing', 'marketings');
      
      Menus.addSubMenuItem('topbar', 'master', 'Mill', 'mills');
      
      Menus.addSubMenuItem('topbar', 'master', 'Needle', 'needles');
      
      Menus.addSubMenuItem('topbar', 'master', 'Party Allot', 'party-allots');
      
      Menus.addSubMenuItem('topbar', 'master', 'Party Master', 'party-masters');
      
      Menus.addSubMenuItem('topbar', 'master', 'Per Hour Production', 'per-hour-productions');
      
      Menus.addSubMenuItem('topbar', 'master', 'Stoppages', 'stoppages');
      
      Menus.addSubMenuItem('topbar', 'master', 'Yarn Description', 'yarn-descriptions');
      
      Menus.addSubMenuItem('topbar', 'master', 'Item Master', 'item-masters');
      
      Menus.addSubMenuItem('topbar', 'master', 'Fabric Iitem Masters', 'fabric-item-masters');
      
    
      Menus.addMenuItem('topbar', 'Reports', 'reports', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'reports', 'Fabric Sales Register', 'fabric-sale-registers');
      
      Menus.addSubMenuItem('topbar', 'reports', 'Fabric Stock Report', 'fabric-stock-reports');
      
      Menus.addSubMenuItem('topbar', 'reports', 'Fabric Transfer Register', 'fabric-transfer-registers');
      
      Menus.addSubMenuItem('topbar', 'reports', 'General Invoice Register', 'general-invoice-registers');
      
      Menus.addSubMenuItem('topbar', 'reports', 'General Item Outstanding Register', 'general-item-outstanding-registers');
      
      Menus.addSubMenuItem('topbar', 'reports', 'General Item Outward Register', 'general-item-outward-registers');
      
      Menus.addSubMenuItem('topbar', 'reports', 'Bulk Needle Change Report', 'bulk-needle-change-reports');
      
      Menus.addSubMenuItem('topbar', 'reports', 'Needles Inward Register', 'needles-inward-registers');
      
      Menus.addSubMenuItem('topbar', 'reports', 'Production Report', 'production-reports');


      Menus.addMenuItem('topbar', 'Wages', 'wages', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'wages', 'Allowance Entry', 'allowance-entries');
      
      Menus.addSubMenuItem('topbar', 'wages', 'Deduction Entry', 'deduction-entries');
      
      Menus.addSubMenuItem('topbar', 'wages', 'Shift Entry', 'shift-entries');
      
      Menus.addSubMenuItem('topbar', 'wages', 'Power And Diesel Consumption Entry', 'power-and-diesel-consumption-entries');
      
    
      Menus.addMenuItem('topbar', 'Outside Knitting', 'outsideknitting', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'outsideknitting', 'Bill Entry', 'bill-entries');
      
      Menus.addSubMenuItem('topbar', 'outsideknitting', 'Fabric Receipt', 'fabric-receipts');
      
      Menus.addSubMenuItem('topbar', 'outsideknitting', 'Item Inclusion', 'item-inclusions');
      
      Menus.addSubMenuItem('topbar', 'outsideknitting', 'Yarn Delivery', 'yarn-deliveries');
      
      Menus.addSubMenuItem('topbar', 'outsideknitting', 'Yarn Return', 'yarn-returns');
      
    
      Menus.addMenuItem('topbar', 'Production', 'production', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'production', 'Job Partial Completion', 'job-partial-completions');
      
      Menus.addSubMenuItem('topbar', 'production', 'Machinewise Entry', 'machinewise-entries');
      
      Menus.addSubMenuItem('topbar', 'production', 'Production Parameter', 'production-parameters');
      
      Menus.addSubMenuItem('topbar', 'production', 'Production Remarks Entry', 'production-remarks-entries');
      
      Menus.addSubMenuItem('topbar', 'production', 'Production Test Entry', 'production-test-entries');
      
      Menus.addSubMenuItem('topbar', 'production', 'Roll Quality Control Entry', 'roll-quality-control-entries');
      
      Menus.addSubMenuItem('topbar', 'production', 'Rollwise Entry', 'rollwise-entries');
      
      Menus.addSubMenuItem('topbar', 'production', 'Order Enquiry', 'order-enquiries');
      
      Menus.addSubMenuItem('topbar', 'production', 'Form Jj', 'form-jjs');       
    
	}
]);
