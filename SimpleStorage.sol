// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage{

    //Solidity Types
    //Boolean, uint, int, address, string, bytes
    // bool isMale = true;
    // uint256 gradePoint = 4;
    // int256 temperature= -10;
    // string programme = 'graduate';
    // bytes32 favouriteAnimal= 'dog';
    // address walletAddress = "0xAD4C780f30846EfAF69463cB277CEE2187554911"

    uint256 public favouriteNumber;

    //Just for one person
    // People public person = People({favouriteNumber: 44, name: "Chukwuebuka"});

    //For multiple person
    People[] public person;

    //In case you would like to narrow down a favourite number to a name
    mapping(string => uint256) public nameToFavouriteNumber;

    //Structs
    struct People {
        uint256 favouriteNumber;
        string name;
    }
    
    function store(uint256 _favouriteNumber)public virtual {
        favouriteNumber = _favouriteNumber; 
        retrieve();
    }

    function retrieve() public view returns(uint256){
        return favouriteNumber;
    }

    function addPerson (string memory _name, uint256 _favouriteNumber)public{
        //Explicit
        person.push(People({favouriteNumber: _favouriteNumber, name: _name}));
        //Less explicit
        // person.push(People(_favouriteNumber, _name));

        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}