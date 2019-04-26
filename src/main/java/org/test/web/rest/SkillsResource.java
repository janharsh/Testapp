package org.test.web.rest;
import org.test.domain.Skills;
import org.test.repository.SkillsRepository;
import org.test.web.rest.errors.BadRequestAlertException;
import org.test.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Skills.
 */
@RestController
@RequestMapping("/api")
public class SkillsResource {

    private final Logger log = LoggerFactory.getLogger(SkillsResource.class);

    private static final String ENTITY_NAME = "skills";

    private final SkillsRepository skillsRepository;

    public SkillsResource(SkillsRepository skillsRepository) {
        this.skillsRepository = skillsRepository;
    }

    /**
     * POST  /skills : Create a new skills.
     *
     * @param skills the skills to create
     * @return the ResponseEntity with status 201 (Created) and with body the new skills, or with status 400 (Bad Request) if the skills has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/skills")
    public ResponseEntity<Skills> createSkills(@RequestBody Skills skills) throws URISyntaxException {
        log.debug("REST request to save Skills : {}", skills);
        if (skills.getId() != null) {
            throw new BadRequestAlertException("A new skills cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Skills result = skillsRepository.save(skills);
        return ResponseEntity.created(new URI("/api/skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /skills : Updates an existing skills.
     *
     * @param skills the skills to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated skills,
     * or with status 400 (Bad Request) if the skills is not valid,
     * or with status 500 (Internal Server Error) if the skills couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/skills")
    public ResponseEntity<Skills> updateSkills(@RequestBody Skills skills) throws URISyntaxException {
        log.debug("REST request to update Skills : {}", skills);
        if (skills.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Skills result = skillsRepository.save(skills);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, skills.getId().toString()))
            .body(result);
    }

    /**
     * GET  /skills : get all the skills.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of skills in body
     */
    @GetMapping("/skills")
    public List<Skills> getAllSkills() {
        log.debug("REST request to get all Skills");
        return skillsRepository.findAll();
    }

    /**
     * GET  /skills/:id : get the "id" skills.
     *
     * @param id the id of the skills to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the skills, or with status 404 (Not Found)
     */
    @GetMapping("/skills/{id}")
    public ResponseEntity<Skills> getSkills(@PathVariable String id) {
        log.debug("REST request to get Skills : {}", id);
        Optional<Skills> skills = skillsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(skills);
    }

    /**
     * DELETE  /skills/:id : delete the "id" skills.
     *
     * @param id the id of the skills to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkills(@PathVariable String id) {
        log.debug("REST request to delete Skills : {}", id);
        skillsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
