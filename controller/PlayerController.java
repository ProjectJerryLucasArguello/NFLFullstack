package jla44.AmericanFootball.NFL_History.controller;

import jla44.AmericanFootball.NFL_History.player.NFLPlayer;
import jla44.AmericanFootball.NFL_History.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Controller: Manages HTTPS requests, delegates to service layer, & provides appropiate response
@RestController
@RequestMapping(path = "/api/v1/nflplayer")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService){
        this.playerService = playerService;
    }

    @GetMapping
    public List<NFLPlayer> getPlayers(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer season,
            @RequestParam(required = false) String position){
        if(name != null && season != null){
            return playerService.getPlayersByNameAndSeason(name, season);
        } else if (team != null && season != null) {
            return playerService.getTeamBySeason(team, season);
        } else if (position !=null) {
            return playerService.getPlayersFromPosition(position);
        } else if (season != null) {
            return playerService.getPlayersFromSeason(season);
        } else if (name != null) {
            return playerService.getPlayersByName(name);
        } else if (team != null) {
            return playerService.getPlayersFromTeam(team);
        } else {
            return playerService.getPlayers();
        }
    }

    @PostMapping
    public ResponseEntity<NFLPlayer> addPlayer(@RequestBody NFLPlayer nflPlayer){
        NFLPlayer createdPlayer = playerService.addPlayer(nflPlayer);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<NFLPlayer>updatePlayer(@RequestBody NFLPlayer nflPlayer){
        NFLPlayer resultPlayer = playerService.updatePlayer(nflPlayer);
        if(resultPlayer != null){
            return new ResponseEntity<>(resultPlayer, HttpStatus.OK);
        }else{
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{player}/{season}")
    public ResponseEntity<String> deletePlayer(@PathVariable String player, @PathVariable Integer season) {
        playerService.deletePlayerFromSeason(player, season);
        return new ResponseEntity<>("Player from season deleted", HttpStatus.OK);
    }
}
