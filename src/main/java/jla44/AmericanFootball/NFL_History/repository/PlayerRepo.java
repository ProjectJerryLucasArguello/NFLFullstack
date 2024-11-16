package jla44.AmericanFootball.NFL_History.repository;

import jla44.AmericanFootball.NFL_History.player.NFLPlayer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepo extends JpaRepository<NFLPlayer, Long> {
    void deleteByNameAndSeason(String name, Integer season); // Deleting by player name and season

    Optional<NFLPlayer> findByName(String name); // Find player by their name

    Optional<NFLPlayer> findBySeason(Integer season); // Find all players in a specific season
}
