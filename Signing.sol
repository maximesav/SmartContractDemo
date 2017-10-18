pragma solidity ^0.4.13;

contract Signing {
    
	// Represents of the possible states of the contract	
    enum States{
        Created,
        Approved,
        Executed
    }
	
    // Start the state of the contract at Created
    States public state = States.Created;
    
	// Creation date of the contract
    uint creationDate = now;
    
	// Parties addresses
    address private a_authority;
    address private a_expert;
    address private a_customer;
    	
	// Boolean representing the signature of each parties
    bool public sign_authority = false;
    bool public sign_expert = false;
    bool public sign_customer = false;
	    
    event Approve(bytes32 message);
    
    modifier atState(States _state){
        require(state == _state);
        _;
    }
    
    modifier addressOnly(address _address){
        require(msg.sender == _address);
        _;
    }
    
    function Signing(address expert, address customer)
    {
        a_authority = msg.sender;
        a_expert = expert;
        a_customer = customer;
    }
    
    function SignAuthority() atState(States.Created) addressOnly(a_authority){
        sign_authority = true;
        ApproveContract();
    }
    
    function SignExpert() atState(States.Created) addressOnly(a_expert){
        sign_expert = true;
        ApproveContract();
    }
    
    function SignCustomer() atState(States.Created) addressOnly(a_customer){
        sign_customer = true;
        ApproveContract();
    }
    
    function ApproveContract() {
        if(sign_authority && sign_expert && sign_customer){
            state = States.Approved;
            Approve('The contract has been approved');
        }
    }	
}
