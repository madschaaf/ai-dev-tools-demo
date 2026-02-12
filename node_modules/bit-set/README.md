Module:         bit-set
Main Class:     BitSet
Description:    BitSet is a class allowing user to create structure like java.util.BitSet
Highlight:      The major difference of this BitSet is an efficient implementation of #nextSetBit and #prevSetBit;

User Guide:     To use a BitSet, simply require('bit-set') as BitSet; And use new BitSet(); to create instances you need;
                Once you have a BitSet instance, it allows you to #set, #clear, #and, #or, #xor to modify the state of it.
                And #get, #nextSetBit, #prevSetBit, #cardinality methods are available to query the state of a BitSet.
                This implementation in particular provides #nextSetBit & #prevSetBit for the purpose of iterations, also its
                cardinality implementation is optimized to count the set bits more efficient, esp. when there're few bits set.

Limitations:    BitSet words are in memory integers, we don't have int64 in javascript, which would speed up the operations further.
                (32 bits number would have to be converted to integer internally for the bit operations, that could be slower than int64)
                Buffer might be a much better choice, but would restrict the usage of BitSet to node.js (browser doesn't have Buffer support)
