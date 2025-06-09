import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    let owner: Principal = Principal.fromText("h5uth-uv34g-lmfuq-dv5pp-oouot-7ap5w-2cj35-hw4l5-epk2q-244xs-rae");
    let totalSupply: Nat = 1_000_000_000;
    let symbol: Text = "NOT";

    private stable var balanceEntries: [(Principal,Nat)]=[];

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    // do {
    //     balances.put(owner, totalSupply);
    // };

    public query func balanceOf(who: Principal) : async Nat {
        switch (balances.get(who)) {
            case null return 0;
            case (?result) return result;
        };
    };

    public query func getSymbol() : async Text{
        return symbol;
    };

    public shared(msg) func payOut() : async  Text {
        //Debug.print(debug_show(msg.caller));

        if(balances.get(msg.caller) == null){
            let amount=10000;
            //balances.put(msg.caller,amount);
            let result=await transfer(msg.caller,amount);
            return result;
        }else{
            return "Already Claimed";
        }
    };

    public shared(msg) func transfer(to:Principal,amount:Nat):async Text{
        let fromBalance=await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller,newFromBalance);

            let toBalance=await balanceOf(to);
            let newToBalance=toBalance+amount;
            balances.put(to,newToBalance);

            return "Success";
        }else{
            return "Insufficient Funds"
        }
    
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries())
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal,Nat>(balanceEntries.val(),1,Principal.equal,Principal.hash);
        if(balances.size() < 1){
            balances.put(owner,totalSupply);
        };
    };

};
