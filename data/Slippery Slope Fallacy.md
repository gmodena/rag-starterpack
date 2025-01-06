date: 2022-01-12
tag: #LogicalFallacy

From [Wikipedia]():
> ... an argument in which a party asserts that a relatively small first step leads to a [chain of related events](https://en.wikipedia.org/wiki/Chain_of_events "Chain of events") culminating in some significant (usually negative) effect ...

- Chain should be of low probability events.
	- For example: "communist control of vietnam => event => ... => global spread of authoritarian regimes.

An initial event `A` kicks in a series of events that culminate in an extreme scenario `Z`
	- Do events needs to be low probability?
		-  I think so, otherwise `Z` might be likely, hence no fallacy!  #MyOpinion 
			- !!!No! They actually don't!!!
		- SIngle events can be high probability! But if assumed independent, multiplying them together whill result in low probabiliyt of Z.
		- Assume A leads to Z requires a chain of 25 events with  $P(A) = P(e_i) = p \forall i \in {1, .., 24}$. - If $p = 0.99$ => $P(Z) = P(A) * \prod_i P(e_i)$ = $0.99 ^{25}$ = 0.77
		  - If $p = 0.95$ => $P(Z) = P(A) * \prod_i P(e_i)$ = $0.95 ^{25}$ = 0.28
		  - If $p = 0.90$ => $P(Z) = P(A) * \prod_i P(e_i)$ = $0.90 ^{25}$ = 0.07
	- `Z` is **extreme**
		- Could be catastrophic or positive
	- `Z` is **inevitable**
		- its likelihood is overstated
# References
- Controllo https://open.spotify.com/episode/5Kni9dq3iPuzR5s1kaz1s2?si=c78ea368d6224bbc
- [Can you outsmart the slippery slope fallacy?](https://www.youtube.com/watch?v=Qt4f7QrfRRc) talk from [[# Elizabeth Cox]] 
- https://en.wikipedia.org/wiki/Slippery_slope
