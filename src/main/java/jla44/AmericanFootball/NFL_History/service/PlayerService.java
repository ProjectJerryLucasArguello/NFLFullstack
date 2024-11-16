package jla44.AmericanFootball.NFL_History.service;

import jakarta.transaction.Transactional;
import jla44.AmericanFootball.NFL_History.player.NFLPlayer;
import jla44.AmericanFootball.NFL_History.repository.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PlayerService {

    private final PlayerRepo repo;

    @Autowired
    public PlayerService(PlayerRepo repo) {
        this.repo = repo;
    }

    //I want to return all the players
    public List<NFLPlayer> getPlayers(){
        return repo.findAll();
    }

    //Create a functionally to get a player from a certain team
    public List<NFLPlayer> getPlayersFromTeam(String team){
        return repo.findAll().stream()
                .filter(nflPlayer -> team.equals(nflPlayer.getTeam()))
                .collect(Collectors.toList()); //Mutable which is what I need as we may need to update when players change teams, stats, etc.
    }

    public List<NFLPlayer> getPlayersByName(String searchText){
        return repo.findAll().stream()
                .filter(nflPlayer -> nflPlayer.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<NFLPlayer> getPlayersFromSeason(Integer season){
        return repo.findAll().stream()
                .filter(nflPlayer -> season.equals(nflPlayer.getSeason()))
                .collect(Collectors.toList());
    }

    public List<NFLPlayer> getPlayersFromPosition(String position){
        return repo.findAll().stream()
                .filter(nflPlayer -> position.equals(nflPlayer.getPosition()))
                .collect(Collectors.toList());
    }

    public List<NFLPlayer> getPlayersByNameAndSeason(String name, Integer season){
        return repo.findAll().stream()
                .filter(nflPlayer -> name.equals(nflPlayer.getName())
                        && season.equals(nflPlayer.getSeason()))
                .collect(Collectors.toList());
    }

    public List<NFLPlayer> getTeamBySeason(String team, Integer season){
        return repo.findAll().stream()
                .filter(nflPlayer -> team.equalsIgnoreCase(nflPlayer.getTeam())
                        && season.equals(nflPlayer.getSeason()))
                .collect(Collectors.toList());
    }

    public NFLPlayer addPlayer(NFLPlayer nflPlayer){
        repo.save(nflPlayer);
        return nflPlayer;
    }

    public NFLPlayer updatePlayer(NFLPlayer updatedNFLPlayer){
        Optional<NFLPlayer> existingPlayer = repo.findByName(
                updatedNFLPlayer.getName()
        );

        if(existingPlayer.isPresent()){
            NFLPlayer nflPlayerUpdate =existingPlayer.get();

            nflPlayerUpdate.setSeason(updatedNFLPlayer.getSeason());

            nflPlayerUpdate.setName(updatedNFLPlayer.getName());

            nflPlayerUpdate.setTeam(updatedNFLPlayer.getTeam());

            nflPlayerUpdate.setAge(updatedNFLPlayer.getAge());

            nflPlayerUpdate.setPosition(updatedNFLPlayer.getPosition());

            nflPlayerUpdate.setGames_played(updatedNFLPlayer.getGames_played());

            nflPlayerUpdate.setGames_started(updatedNFLPlayer.getGames_started());

            nflPlayerUpdate.setRushing_touchdowns(updatedNFLPlayer.getRushing_touchdowns());

            nflPlayerUpdate.setRecieving_touchdowns(updatedNFLPlayer.getRecieving_touchdowns());
        }
        return null;
    }

    @Transactional
    public void deletePlayerFromSeason(String name, Integer season){
        repo.deleteByNameAndSeason(name, season);
    }
}
